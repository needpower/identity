import { CAMERA_NUDGE_X, CAMERA_NUDGE_Y, MAP_CELL_SIZE } from "./config"
import heroImage from "./images/characters/people/hero.png"
import npc1Image from "./images/characters/people/npc1.png"
import npc2Image from "./images/characters/people/npc2.png"
import npc3Image from "./images/characters/people/npc3.png"
import lowerDemoSceneImage from "./images/maps/DemoLower.png"
import upperDemoSceneImage from "./images/maps/DemoUpper.png"
import lowerKitchenSceneImage from "./images/maps/KitchenLower.png"
import upperKitchenSceneImage from "./images/maps/KitchenUpper.png"
import OverworldEvent, { PERSON_STAND, PERSON_WALKING } from "./OverworldEvent"
import Person from "./Person"

export default class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects

    this.lowerImage = new Image()
    this.lowerImage.src = config.lowerImage

    this.upperImage = new Image()
    this.upperImage.src = config.upperImage

    this.isCutscenePlaying = false

    this.walls = config.walls
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
    Object.values(this.gameObjects)
      .sort((obj1, obj2) => obj1.y - obj2.y)
      .forEach((gameObject) => {
        gameObject.draw(ctx, cameraPerson)
      })
  }

  mountGameObjects() {
    Object.entries(this.gameObjects).forEach(([objectId, gameObject]) => {
      gameObject.mount(this, objectId)
    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true

    for (let index = 0; index < events.length; index++) {
      const cutsceneEvent = events[index]
      const overworldEvent = new OverworldEvent({
        map: this,
        event: cutsceneEvent,
      })
      await overworldEvent.run()
    }

    this.isCutscenePlaying = false

    // After a cutscene, restore behaviour loop for each object
    Object.values(this.gameObjects).forEach((gameObject) =>
      gameObject.doBehaviourLoop(this)
    )
  }

  isSpaceTaken(x, y, direction) {
    const hypotheticPositionOfWall = nextPosition(x, y, direction)
    const hypotheticWallCoords = `${hypotheticPositionOfWall.x},${hypotheticPositionOfWall.y}`
    return this.walls[hypotheticWallCoords]
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY)
    const { x: nextX, y: nextY } = nextPosition(wasX, wasY, direction)
    this.addWall(nextX, nextY)
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
        x: withGrid(3),
        y: withGrid(7),
        behaviourLoop: [
          { type: PERSON_WALKING, direction: "left" },
          { type: PERSON_WALKING, direction: "down" },
          { type: PERSON_WALKING, direction: "down" },
          { type: PERSON_WALKING, direction: "right" },
          { type: PERSON_STAND, direction: "up", time: 500 },
          { type: PERSON_WALKING, direction: "up" },
          { type: PERSON_WALKING, direction: "up" },
          { type: PERSON_STAND, direction: "up", time: 300 },
        ],
      }),
    },
    walls: {
      [asGridCoords(7, 6)]: true,
      [asGridCoords(8, 6)]: true,
      [asGridCoords(7, 7)]: true,
      [asGridCoords(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerImage: lowerKitchenSceneImage,
    upperImage: upperKitchenSceneImage,
    gameObjects: {
      hero: new Person({
        src: heroImage,
        useShadow: true,
        isPlayerControlled: true,
        x: withGrid(6),
        y: withGrid(7),
      }),
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
  return Number(value) * MAP_CELL_SIZE
}

function asGridCoords(x, y) {
  return `${Number(x) * MAP_CELL_SIZE},${Number(y) * MAP_CELL_SIZE}`
}

function nextPosition(prevX, prevY, direction) {
  let [x, y] = [prevX, prevY]
  switch (direction) {
    case "up":
      y = prevY - MAP_CELL_SIZE
      break
    case "down":
      y = prevY + MAP_CELL_SIZE
      break
    case "left":
      x = prevX - MAP_CELL_SIZE
      break
    case "right":
      x = prevX + MAP_CELL_SIZE
      break
    default:
      break
  }
  return { x, y }
}
