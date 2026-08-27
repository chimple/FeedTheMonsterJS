import { Score, Statement, TinCan } from "tincants";

interface RespectActor {
  objectType?: "Agent";
  name?: string | string[];
  mbox?: string | string[];
  account?: {
    homePage?: string;
    name?: string;
  };
}

interface RespectLaunchData {
  endpoint: string;
  auth: string;
  actor: RespectActor;
  activityId: string;
  registration: string;
}

export interface RespectLevelCompletion {
  lessonId: string;
  score: number;
  success: boolean;
  rightMoves: number;
  wrongMoves: number;
  duration: number;
}

const getFirstValue = (value?: string | string[]): string | null => {
  if (typeof value === "string" && value.length > 0) return value;
  if (Array.isArray(value) && typeof value[0] === "string" && value[0].length > 0) {
    return value[0];
  }

  return null;
};

const getRespectLaunchData = (): RespectLaunchData | null => {
  const searchParameters = new URLSearchParams(window.location.search);
  const actorValue = searchParameters.get("actor");
  const endpoint = searchParameters.get("endpoint") ?? "";
  const auth = searchParameters.get("auth") ?? "";
  const activityId = searchParameters.get("activity_id") ?? "";

  if (!endpoint || !auth || !activityId || !actorValue) return null;

  try {
    const actor = JSON.parse(actorValue) as RespectActor;
    const hasAccount = Boolean(actor.account?.homePage && actor.account.name);
    if (!getFirstValue(actor.mbox) && !hasAccount) return null;

    return {
      endpoint,
      auth,
      actor,
      activityId,
      registration: searchParameters.get("registration") ?? "",
    };
  } catch {
    return null;
  }
};

const toXapiActor = (
  actor: RespectActor,
): {
  objectType: "Agent";
  name?: string;
  mbox?: string;
  account?: { homePage: string; name: string };
} => {
  const name = getFirstValue(actor.name) ?? undefined;
  const mbox = getFirstValue(actor.mbox);

  if (mbox) return { objectType: "Agent", name, mbox };

  return {
    objectType: "Agent",
    name,
    account: {
      homePage: actor.account?.homePage ?? "",
      name: actor.account?.name ?? "",
    },
  };
};

const formatDuration = (duration: number): string => {
  const totalSeconds = Math.max(0, Math.floor(duration));
  return `PT${Math.floor(totalSeconds / 60)}M${totalSeconds % 60}S`;
};

export const sendRespectLevelCompletion = async (
  completion: RespectLevelCompletion,
): Promise<boolean> => {
  const launchData = getRespectLaunchData();
  if (!launchData) {
    console.warn("[RESPECT xAPI] Completion not sent: launch data is incomplete.");
    return false;
  }

  const score = new Score({ raw: completion.score });
  score.scaled = Math.max(0, Math.min(1, completion.score / 100));

  const statement = new Statement({
    id: crypto.randomUUID(),
    actor: toXapiActor(launchData.actor),
    verb: {
      id: "http://adlnet.gov/expapi/verbs/completed",
      display: { "en-US": "completed" },
    },
    object: {
      objectType: "Activity",
      id: launchData.activityId,
      definition: {
        name: { "en-US": completion.lessonId },
        extensions: {
          "http://example.com/xapi/lessonId": completion.lessonId,
        },
      },
    },
    result: {
      score,
      success: completion.success,
      completion: true,
      response: `Correct: ${completion.rightMoves}, Wrong: ${completion.wrongMoves}`,
      duration: formatDuration(completion.duration),
      extensions: {
        "http://example.com/xapi/correctMoves": completion.rightMoves,
        "http://example.com/xapi/wrongMoves": completion.wrongMoves,
        "http://example.com/xapi/timeSpent": completion.duration,
      },
    },
    context: {
      registration: launchData.registration || undefined,
    },
    timestamp: new Date().toISOString(),
  });

  const tincan = new TinCan({});
  tincan.addRecordStore({ endpoint: launchData.endpoint, auth: launchData.auth });

  // Android WebView coerces object log arguments to "[object Object]", so emit safe JSON text instead.
  console.info(
    `[RESPECT xAPI] Sending completion statement: ${JSON.stringify({
      statementId: statement.id,
      activityId: launchData.activityId,
      lessonId: completion.lessonId,
      score: completion.score,
      success: completion.success,
    })}`,
  );

  try {
    const { results } = await tincan.sendStatement(statement);
    const failures = results.filter((result) => result.err);

    if (failures.length > 0) {
      console.error(
        `[RESPECT xAPI] Completion was rejected or could not be sent: ${JSON.stringify({
          statementId: statement.id,
          activityId: launchData.activityId,
          errors: failures.map((result) => String(result.err)),
        })}`,
      );
      return false;
    }

    console.info(
      `[RESPECT xAPI] Completion accepted by the LRS: ${JSON.stringify({
        statementId: statement.id,
        activityId: launchData.activityId,
        responses: results.map((result) => ({
          status: result.response?.status,
          statusText: result.response?.statusText,
        })),
      })}`,
    );
    return true;
  } catch (error) {
    console.error(
      `[RESPECT xAPI] Completion submission failed unexpectedly: ${JSON.stringify({
        statementId: statement.id,
        activityId: launchData.activityId,
        error: error instanceof Error ? error.message : String(error),
      })}`,
    );
    return false;
  }
};
