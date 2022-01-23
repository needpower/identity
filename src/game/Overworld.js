import DirectionInput from "./DirectionInput"
import KeyPressListener from "./KeyPressListener"
import { PERSON_WALKING_COMPLETE } from "./OverworldEvent"
import OverworldMap, { overworldMapsConfig } from "./OverworldMap"

const directionsListener = new DirectionInput()

export default class Overworld {
  constructor(config) {
    this.canvas = config.canvas
    this.ctx = this.canvas.getContext("2d")
    this.map = undefined
  }

  startMap(name) {
    this.map = new OverworldMap(overworldMapsConfig[name], this)
    this.map.mountGameObjects()
  }

  bindActionsInput() {
    new KeyPressListener("Space", () => {
      this.map.checkForActionsCutscene()
    })
  }

  bindHeroPositionCheck() {
    document.addEventListener(PERSON_WALKING_COMPLETE, (event) => {
      if (event.detail.who === "hero") {
        this.map.checkForFootstepCutscene()
      }
    })
  }

  startGameLoop() {
    const gameLoop = () => {
      Object.values(this.map.gameObjects).forEach((gameObject) => {
        gameObject.update({
          direction: directionsListener.direction,
          map: this.map,
        })
      })
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      const cameraPerson = this.map.gameObjects.hero
      this.map.drawLowerImage(this.ctx, cameraPerson)
      this.map.drawGameObjects(this.ctx, cameraPerson)
      this.map.drawUpperImage(this.ctx, cameraPerson)

      // This makes infinite loop of running step funtion on each frame.
      // Frames frequency depends on hardware abilities, e.g. monitor FPS value, CPU
      requestAnimationFrame(gameLoop)
    }
    gameLoop()
  }

  init() {
    this.startMap("Demo")
    this.bindActionsInput()
    this.bindHeroPositionCheck()
    this.startGameLoop()
  }
}
