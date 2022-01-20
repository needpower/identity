import DirectionInput from "./DirectionInput"
import { PERSON_STAND, PERSON_WALKING } from "./OverworldEvent"
import OverworldMap, { overworldMapsConfig } from "./OverworldMap"

const directionsListener = new DirectionInput()

export default class Overworld {
  constructor(config) {
    this.canvas = config.canvas
    this.ctx = this.canvas.getContext("2d")
  }

  startGameLoop = (map) => {
    const gameLoop = () => {
      Object.values(map.gameObjects).forEach((gameObject) => {
        gameObject.update({
          direction: directionsListener.direction,
          map,
        })
      })
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      const cameraPerson = map.gameObjects.hero
      map.drawLowerImage(this.ctx, cameraPerson)
      map.drawGameObjects(this.ctx, cameraPerson)
      map.drawUpperImage(this.ctx, cameraPerson)

      // This makes infinite loop of running step funtion on each frame.
      // Frames frequency depends on hardware abilities, e.g. monitor FPS value, video card
      requestAnimationFrame(gameLoop)
    }
    gameLoop()
  }

  init = () => {
    const demoMap = new OverworldMap(overworldMapsConfig.Demo)
    demoMap.mountGameObjects()
    this.startGameLoop(demoMap)
    demoMap.startCutscene([
      { who: "hero", type: PERSON_WALKING, direction: "down" },
      { who: "hero", type: PERSON_WALKING, direction: "down" },
      { who: "hero", type: PERSON_STAND, direction: "left", time: 100 },
      { who: "npc1", type: PERSON_WALKING, direction: "down" },
      { who: "npc1", type: PERSON_WALKING, direction: "down" },
      { who: "npc1", type: PERSON_WALKING, direction: "right" },
      { who: "npc1", type: PERSON_WALKING, direction: "right" },
    ])
  }
}
