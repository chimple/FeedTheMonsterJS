import { lang } from "@common";

const OPDS_URL = `./lang/${lang}/feed_the_monster_${lang}.opds.json`;

export async function getOPDSData() {
    const opdsResponse = await fetch(OPDS_URL, {
    method: "GET",
    headers: {
        "Content-Type": "application/opds+json",
    },
    });

    if (!opdsResponse.ok) {
    throw new Error("Failed to fetch OPDS feed");
    }

    const opdsData = await opdsResponse.json();

    // Extract lesson URL from publication
    const publication = opdsData?.groups?.[0]?.publications?.[0];
    const lessonUrl = publication?.links?.[0]?.href;

    if (!lessonUrl) {
    throw new Error("Lesson URL not found in OPDS feed");
    }

    const lessonResponse = await fetch(lessonUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    });

    if (!lessonResponse.ok) {
    throw new Error("Failed to fetch lesson data");
    }

    const lessonData = await lessonResponse.json();

  return {
    ...lessonData,
    title: publication.metadata?.title,
    identifier: publication.metadata?.identifier,
    Language: publication.metadata?.language,
    RightToLeft: publication.metadata?.RightToLeft,
    FeedbackTexts: publication.metadata?.feedbackTexts,
    FeedbackAudios: publication.metadata?.feedbackAudios,
    OtherAudios: publication.metadata?.otherAudios,
    majversion: publication.metadata?.majversion,
    minversion: publication.metadata?.minversion,
    langname: publication.metadata?.langname
  };
}
