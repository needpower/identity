import OverworldMap, { overworldMapsConfig } from "./OverworldMap"

export default class Overworld {
  constructor(config) {
    this.canvas = config.canvas
    this.ctx = this.canvas.getContext("2d")
  }

  startGameLoop = (map) => {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      map.drawLowerImage(this.ctx)
      map.drawGameObjects(this.ctx)
      map.drawUpperImage(this.ctx)
      requestAnimationFrame(step)
    }
    step()
  }

  init = () => {
    const demoMap = new OverworldMap(overworldMapsConfig.Demo)
    this.startGameLoop(demoMap)
  }
}
