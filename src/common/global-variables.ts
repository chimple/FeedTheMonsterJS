const urlParams = new URLSearchParams(window.location.search);

import { DevelopmentServer, TestServer } from "@constants";
import { Utils } from "@common";

export var pseudoId = urlParams.get("cr_user_id");
export var source = urlParams.get("source") == null ? null : urlParams.get("source");
export var campaign_id = urlParams.get("campaign_id") == null ? null : urlParams.get("campaign_id");

const supportedLanguages = [
  "afrikaans", "amharic", "arabic", "arabictest", "australianenglish", "azerbaijani", "bangla", "brazilianportuguese", "caboverdecreole", "caboverdeportuguese", "english", "englishwestafrican", "farsi", "farsitest", "french", "georgian", "gujarati", "haitiancreole", "hausa", "hindi", "igbo", "indianenglish", "isixhosa", "javanese", "kannada", "kinyarwanda", "kirundi", "kurdish", "lugandan", "malay", "malgache", "marathi", "ndebele", "nepali", "oromo", "pashto", "punjabi", "sepedi", "sesotho", "shona", "siswati", "somali", "southafricanenglish", "spanish", "swahili", "tagalog", "tajik", "tamil", "telugu", "thai", "tigragna", "tsonga", "tswana", "turkish", "twi", "ukrainian", "venda", "vietnamese", "wolof", "yoruba", "zulu"
];

let urlLang = urlParams.get("lang") != null ? urlParams.get("lang").toLowerCase() : null;
export var lang = supportedLanguages.includes(urlLang) ? urlLang : "english";

export var lesson_id = urlParams.get("lesson_id") == null || urlParams.get("lesson_id") == "0" ? "1" : urlParams.get("lesson_id");

export const font = Utils.getLanguageSpecificFont(lang);
export const Debugger = {
  DevelopmentLink: window.location.href.includes(DevelopmentServer)
    ? true
    : false,
  TestLink: window.location.href.includes(TestServer)
    ? true
    : false,
  DebugMode: false,
};

export interface Window {
  webkitAudioContext?: typeof AudioContext;
}
