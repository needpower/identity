import { MAP_CELL_SIZE } from "./config"
import GameObject from "./GameObject"

export default class Person extends GameObject {
  constructor(config) {
    super(config)
    this.isPlayerControlled = config.isPlayerControlled || false
    this.directionsUpdatesMap = {
      up: ["y", -1],
      down: ["y", 1],
      right: ["x", 1],
      left: ["x", -1],
    }
    this.directionToAnimationNameMap = {
      "idle-up": "idleUp",
      "walk-up": "walkUp",
      "idle-down": "idleDown",
      "walk-down": "walkDown",
      "idle-left": "idleLeft",
      "walk-left": "walkLeft",
      "idle-right": "idleRight",
      "walk-right": "walkRight",
    }
    // Grid-based movement
    // One unit of person's step = one grid cell = MAP_CELL_SIZE
    this.movingProgressRemaining = 0
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    } else {
      if (state.direction && this.isPlayerControlled) {
        this.startBehaviour(state.map, {
          type: "walk",
          direction: state.direction,
        })
      }
    }
    this.updateSprite(state)
  }

  startBehaviour(map, { type, direction }) {
    if (type === "walk") {
      this.direction = direction
      if (map.isSpaceTaken(this.x, this.y, direction)) {
        // Face a character to the specified direction
        this.setAnimation(
          this.directionToAnimationNameMap[`idle-${this.direction}`]
        )
      } else {
        this.movingProgressRemaining = MAP_CELL_SIZE
        // A character also carries a wall wherever it moves, so it doesn't overlaps with other models
        map.moveWall(this.x, this.y, direction)
      }
    }
  }

  updatePosition() {
    const [axis, amount] = this.directionsUpdatesMap[this.direction]
    this[axis] += amount
    this.movingProgressRemaining -= 1
  }

  updateSprite(state) {
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      !state.direction
    ) {
      this.setAnimation(
        this.directionToAnimationNameMap[`idle-${this.direction}`]
      )
      return
    }

    if (this.movingProgressRemaining > 0) {
      this.setAnimation(
        this.directionToAnimationNameMap[`walk-${this.direction}`]
      )
      return
    }
  }
}
