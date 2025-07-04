// let resolvedData: any = null;

// export function getOPDSData(): Promise<any> {
//   return new Promise((resolve, reject) => {
//     if (resolvedData) {
//       return resolve(resolvedData);
//     }

//     (window as any).onDataFromAndroid = (jsonString: string) => {
//       try {
//         const data = JSON.parse(jsonString);

//         resolvedData = data;
//         resolve(resolvedData);

//       } catch (e) {
//         console.error("Failed to parse data from Android bridge:", e);
//         reject(e);
//       }
//     };

//     (window as any).requestDataFromContainer?.("FTM_OPDS_DATA");
//   });
// }

import { lang } from "@common";

export async function getOPDSData(): Promise<any> {
  try {
    // Construct the JSON file path based on the language
    const jsonFilePath = `./lang/${lang}/ftm_${lang}.json`;

    // Fetch the JSON file
    const response = await fetch(jsonFilePath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to load JSON file: ${jsonFilePath}`);
    }

    // Parse and return the JSON data
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}