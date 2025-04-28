let resolvedData: any = null;

export function getOPDSData(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (resolvedData) {
      return resolve(resolvedData);
    }

    (window as any).onDataFromAndroid = (jsonString: string) => {
      try {
        const data = JSON.parse(jsonString);

        resolvedData = data;
        resolve(resolvedData);

      } catch (e) {
        console.error("Failed to parse data from Android bridge:", e);
        reject(e);
      }
    };

    (window as any).requestDataFromContainer?.("FTM_OPDS_DATA");
  });
}
