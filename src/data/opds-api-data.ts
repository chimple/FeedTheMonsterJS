let resolvedData: any = null;

export function getOPDSData(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (resolvedData) {
      return resolve(resolvedData);
    }

    (window as any).onDataFromAndroid = (jsonString: string) => {
      try {
        const data = JSON.parse(jsonString);

        const publication = data?.groups?.[0]?.publications?.[0];
        const lessonUrlData = publication?.links?.[0]?.lessonData;

        if (!lessonUrlData) {
          return reject("Lesson data not found in OPDS JSON");
        }

        resolvedData = {
          ...lessonUrlData,
          title: publication.metadata?.title,
          identifier: publication.metadata?.identifier,
          Language: publication.metadata?.language,
          RightToLeft: publication.metadata?.RightToLeft,
          FeedbackTexts: publication.metadata?.feedbackTexts,
          FeedbackAudios: publication.metadata?.feedbackAudios,
          OtherAudios: publication.metadata?.otherAudios,
          majversion: publication.metadata?.majversion,
          minversion: publication.metadata?.minversion,
          langname: publication.metadata?.langname,
        };

        resolve(resolvedData);
      } catch (e) {
        console.error("Failed to parse data from Android bridge:", e);
        reject(e);
      }
    };

    (window as any).requestDataFromContainer?.("FTM_OPDS_DATA");
  });
}
