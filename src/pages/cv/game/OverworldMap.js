import heroImage from "./images/characters/people/hero.png"
import npc1Image from "./images/characters/people/npc1.png"
import npc2Image from "./images/characters/people/npc2.png"
import npc3Image from "./images/characters/people/npc3.png"
import lowerDemoSceneImage from "./images/maps/DemoLower.png"
import upperDemoSceneImage from "./images/maps/DemoUpper.png"
import lowerKitchenSceneImage from "./images/maps/KitchenLower.png"
import upperKitchenSceneImage from "./images/maps/KitchenUpper.png"
import Person from "./Person"

const CAMERA_NUDGE_X = 10.5
const CAMERA_NUDGE_Y = 6

export default class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerImage

    this.upperImage = new Image()
    this.upperImage.src = config.upperImage
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      0 + withGrid(CAMERA_NUDGE_X) - cameraPerson.x,
      0 + withGrid(CAMERA_NUDGE_Y) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      0 + withGrid(CAMERA_NUDGE_X) - cameraPerson.x,
      0 + withGrid(CAMERA_NUDGE_Y) - cameraPerson.y
    )
  }

  drawGameObjects(ctx, cameraPerson) {
    Object.values(this.gameObjects).forEach((gameObject) => {
      gameObject.draw(ctx, cameraPerson)
    })
  }
}

export const overworldMapsConfig = {
  Demo: {
    lowerImage: lowerDemoSceneImage,
    upperImage: upperDemoSceneImage,
    gameObjects: {
      hero: new Person({
        src: heroImage,
        useShadow: true,
        isPlayerControlled: true,
        x: withGrid(6),
        y: withGrid(7),
      }),
      npc1: new Person({
        src: npc1Image,
        useShadow: true,
        x: withGrid(9),
        y: withGrid(7),
      }),
    },
  },
  Kitchen: {
    lowerImage: lowerKitchenSceneImage,
    upperImage: upperKitchenSceneImage,
    gameObjects: {
      npc2: new Person({
        src: npc2Image,
        useShadow: true,
        x: withGrid(8),
        y: withGrid(6),
      }),
      npc3: new Person({
        src: npc3Image,
        useShadow: true,
        x: withGrid(4),
        y: withGrid(9),
      }),
    },
  },
}

// Normalize value to move object around the map by adding/subtracting 1
function withGrid(value) {
  const MAP_CELL_SIZE = 16
  return Number(value) * MAP_CELL_SIZE
}
