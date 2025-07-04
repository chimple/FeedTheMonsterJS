import { Debugger, lang } from "@common";
import { AndroidBridge } from "../common/utils";

export class GameScore {
  public static currentlanguage: string = lang;

  public static setGameLevelScore(currentLevelInfo, score) {
    let starsGained = this.calculateStarCount(score);
    let levelPlayedInfo = {
      levelName: currentLevelInfo.levelMeta.levelType,
      levelNumber: currentLevelInfo.levelMeta.levelNumber,
      score: score,
      starCount: starsGained,
    };
    this.setTotalStarCount(starsGained);
    let allGamelevelInfo: any[] = this.getAllGameLevelInfo();
    let index = -1;
    for (let i = 0; i < allGamelevelInfo.length; i++) {
      if (allGamelevelInfo[i].levelNumber === levelPlayedInfo.levelNumber) {
        index = i;
        break;
      }
    }
    if (index !== -1 && levelPlayedInfo.score > allGamelevelInfo[index].score) {
      allGamelevelInfo[index] = levelPlayedInfo;
    } else {
      allGamelevelInfo.push(levelPlayedInfo);
    }
    localStorage.setItem(
      this.currentlanguage + "gamePlayedInfo",
      JSON.stringify(allGamelevelInfo)
    );
  }

  public static getAllGameLevelInfo(): Map<string, any>[] {
    const levelInfoData = [];

    if (window.Android?.sendGameLevelInfoToJS) {
      AndroidBridge.requestGameLevelInfo()
        .then(levelInfo => {
          levelInfo.forEach(element => {
            levelInfoData.push(element);
          });
        })
        .catch(err => console.error("Failed to get game level info:", err));
    }

    return levelInfoData as any;
  }

  public static setTotalStarCount(starsGained): void {
    let starCount = this.getTotalStarCount();
    let totalStarCount = starCount + starsGained;
    localStorage.setItem(
      this.currentlanguage + "totalStarCount",
      totalStarCount
    );
  }

  public static getTotalStarCount(): number {
    const starCount = localStorage.getItem(
      this.currentlanguage + "totalStarCount"
    );
    return starCount == undefined ? 0 : parseInt(starCount);
  }

  public static calculateStarCount(score: number): number {
    return score >= 25 && score <= 50
    ? 1
    : score > 50 && score <= 75
    ? 2
    : score > 75 && score <= 100
    ? 3
    : 0;
  }

  public static getDatafromStorage() {
    const data = Debugger.DebugMode
      ? JSON.parse(localStorage.getItem(lang + "ProfileDebug") || "{}")
      : JSON.parse(localStorage.getItem(lang + "Profile") || "{}");
    return data;
  }
}
