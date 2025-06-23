import {
  StartScene,
  LevelSelectionScreen,
  GameplayScene,
  LoadingScene,
  LevelEndScene,
} from "@scenes";
import { DataModal, GameScore } from "@data";
import { Debugger } from "@common";
import {
  SCENE_NAME_START,
  SCENE_NAME_LEVEL_SELECT,
  SCENE_NAME_GAME_PLAY,
  SCENE_NAME_LEVEL_END,
  PWAInstallStatus,
  StartScene1,
  LevelSelection1,
  GameScene1,
  EndScene1,
} from "@constants";

export class SceneHandler {
  public canvas: HTMLCanvasElement;
  public data: DataModal;
  public width: number;
  public height: number;
  public startScene: StartScene;
  public levelSelectionScene: LevelSelectionScreen;
  public gameplayScene: GameplayScene;
  public levelEndScene: LevelEndScene;
  public canavsElement: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public static SceneName: string;
  public loadingScreen: LoadingScene;
  public loading: boolean = false;

  private lastTime: number = 0;
  private toggleBtn: HTMLElement;
  private titleTextElement: HTMLElement;

  private static lastStartScene: StartScene | undefined;

  constructor(canvas: HTMLCanvasElement, data: DataModal, initialSceneName?: string, gamePlayData?: any) {
    // Hard reset the canvas element to remove all event listeners
    const oldCanvas = document.getElementById("canvas");
    if (oldCanvas) {
      const newCanvas = oldCanvas.cloneNode(true);
      oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);
      this.canavsElement = newCanvas as HTMLCanvasElement;
      this.canvas = newCanvas as HTMLCanvasElement;
      this.context = this.canavsElement.getContext("2d");
    } else {
      this.canavsElement = document.getElementById("canvas") as HTMLCanvasElement;
      this.canvas = this.canavsElement;
      this.context = this.canavsElement.getContext("2d");
    }
    this.data = data;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.toggleBtn = document.getElementById("toggle-btn") as HTMLElement;
    this.titleTextElement = document.getElementById("title") as HTMLElement;
    window.addEventListener("beforeinstallprompt", this.handleInstallPrompt);
    this.loadingScreen = new LoadingScene(
      this.width,
      this.height,
      this.removeLoading
    );
    // Dispose previous StartScene if it exists
    if (SceneHandler.lastStartScene) {
      SceneHandler.lastStartScene.dispose();
      SceneHandler.lastStartScene = undefined;
    }
    // Only create startScene if not starting directly in GameScene1
    if (initialSceneName === GameScene1 && gamePlayData) {
      this.startScene = undefined;
      this.gameplayScene = new GameplayScene(
        this.canvas,
        gamePlayData.currentLevelData,
        this.checkMonsterPhaseUpdation(),
        this.data.FeedbackTexts,
        this.data.rightToLeft,
        this.switchSceneToEndLevel,
        gamePlayData.selectedLevelNumber,
        () => {
          this.switchSceneToLevelSelection(SCENE_NAME_GAME_PLAY);
        },
        this.switchSceneToGameplay,
        (this.data.majVersion && this.data.minVersion)
          ? this.data.majVersion.toString() + "." + this.data.minVersion.toString()
          : "",
        this.data.FeedbackAudios
      );
      SceneHandler.SceneName = GameScene1;
    } else {
      this.startScene = new StartScene(
        this.canvas,
        data,
        this.switchSceneToLevelSelection
      );
      SceneHandler.lastStartScene = this.startScene;
      SceneHandler.SceneName = initialSceneName || StartScene1;
    }
    this.startAnimationLoop();
  }

  startAnimationLoop() {
    const animate = (timeStamp: number) => {
      this.animation(timeStamp);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  devToggle() {
    this.toggleBtn.addEventListener("click", () => {
      this.toggleBtn.classList.toggle("on");
      if (this.toggleBtn.classList.contains("on")) {
        Debugger.DebugMode = true;
        this.toggleBtn.innerText = "Dev";
      } else {
        Debugger.DebugMode = false;
        this.toggleBtn.innerText = "Dev";
      }
    });
  }

  public checkMonsterPhaseUpdation(): number {
    let totalStarCount = GameScore.getTotalStarCount();
    let monsterPhaseNumber = Math.floor(totalStarCount / 12) + 1 || 1;
    return monsterPhaseNumber <= 4 ? monsterPhaseNumber : 4;
  }

  animation = (timeStamp: number) => {
    let deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;

    this.context.clearRect(0, 0, this.width, this.height);
    this.loading ? this.loadingScreen.draw(deltaTime) : null;

    if (SceneHandler.SceneName === StartScene1) {
      this.startScene.animation(deltaTime);
    } else if (SceneHandler.SceneName === LevelSelection1) {
      if (
        this.levelSelectionScene &&
        typeof this.levelSelectionScene.drawLevelSelection === "function"
      ) {
        this.levelSelectionScene.drawLevelSelection();
      }
    } else if (SceneHandler.SceneName === GameScene1) {
      if (this.gameplayScene && typeof this.gameplayScene.draw === "function") {
        this.gameplayScene.draw(deltaTime);
      }
    } else if (SceneHandler.SceneName === EndScene1) {
      if (this.levelEndScene && typeof this.levelEndScene.draw === "function") {
        this.levelEndScene.draw(deltaTime);
      }
    }
  };

  switchSceneToGameplay = (gamePlayData, changeSceneRequestFrom?: string) => {
    this.showLoading();
    this.dispose(changeSceneRequestFrom);
    let jsonVersionNumber =
      !!this.data.majVersion && !!this.data.minVersion
        ? this.data.majVersion.toString() +
          "." +
          this.data.minVersion.toString()
        : "";
    setTimeout(() => {
      this.gameplayScene = new GameplayScene(
        this.canvas,
        gamePlayData.currentLevelData,
        this.checkMonsterPhaseUpdation(),
        this.data.FeedbackTexts,
        this.data.rightToLeft,
        this.switchSceneToEndLevel,
        gamePlayData.selectedLevelNumber,
        () => {
          this.switchSceneToLevelSelection(SCENE_NAME_GAME_PLAY);
        },
        this.switchSceneToGameplay,
        jsonVersionNumber,
        this.data.FeedbackAudios
      );
      SceneHandler.SceneName = GameScene1;
    }, 800);
  };

  switchSceneToEndLevel = (
    starCount: number,
    monsterPhaseNumber: number,
    currentLevelNumber,
    isTimerEnded: boolean
  ) => {
    this.loadingScreen.initCloud();

    setTimeout(
      () => {
        this.dispose(SCENE_NAME_GAME_PLAY);
        this.levelEndScene = new LevelEndScene(
          this.canvas,
          this.height,
          this.width,
          this.context,
          starCount,
          currentLevelNumber,
          this.switchSceneToGameplay,
          this.switchSceneToLevelSelection,
          this.data,
          monsterPhaseNumber
        );
        SceneHandler.SceneName = EndScene1;
      },
      isTimerEnded ? 0 : 4000
    );
  };

  switchSceneToLevelSelection = (changeSceneRequestFrom?: string) => {
    console.log("switchSceneToLevelSelection called", { changeSceneRequestFrom, SceneName: SceneHandler.SceneName });
    this.showLoading();
    this.dispose(changeSceneRequestFrom);
    setTimeout(() => {
      this.levelSelectionScene = new LevelSelectionScreen(
        this.canvas,
        this.data,
        this.switchSceneToGameplay
      );
      SceneHandler.SceneName = LevelSelection1;
      this.titleTextElement.style.display = "none";
    }, 800);
  };

  private dispose = (lastSceneName: string): void => {
    if (lastSceneName == SCENE_NAME_LEVEL_SELECT) {
      this.levelSelectionScene.dispose();
    } else if (lastSceneName === SCENE_NAME_GAME_PLAY) {
      this.gameplayScene.dispose();
    } else if (lastSceneName === SCENE_NAME_START) {
      this.startScene.dispose();
    } else if (lastSceneName == SCENE_NAME_LEVEL_END) {
      this.levelEndScene.dispose();
    }
  };

  private showLoading = (): void => {
    this.loadingScreen.initCloud();
    this.loading = true;
    document.getElementById("loading").style.zIndex = "3";
  };

  private removeLoading = (): void => {
    document.getElementById("loading").style.zIndex = "-1";
    this.loading = false;
  };

  private handleInstallPrompt = (event: Event) => {
    //currently not in use
    event.preventDefault();
    localStorage.setItem(PWAInstallStatus, "false");
  };
}
