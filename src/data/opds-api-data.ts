
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
    console.error("Error loading language-specific JSON file:", error);
    throw error;
  }
}