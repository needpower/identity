import DirectionInput from "./DirectionInput"
import OverworldMap, { overworldMapsConfig } from "./OverworldMap"

const directionsListener = new DirectionInput()

export default class Overworld {
  constructor(config) {
    this.canvas = config.canvas
    this.ctx = this.canvas.getContext("2d")
  }

  startGameLoop = (map) => {
    const step = () => {
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
      requestAnimationFrame(step)
    }
    step()
  }

  init = () => {
    const demoMap = new OverworldMap(overworldMapsConfig.Demo)
    demoMap.mountGameObjects()
    this.startGameLoop(demoMap)
  }
}
