import { MAP_CELL_SIZE } from "./config"
import GameObject from "./GameObject"
import {
  emitEvent,
  PERSON_STAND,
  PERSON_STAND_COMPLETE,
  PERSON_WALKING,
  PERSON_WALKING_COMPLETE,
} from "./OverworldEvent"

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
    this.isStanding = false
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition()
    }
    if (
      this.movingProgressRemaining === 0 &&
      !state.map.isCutscenePlaying &&
      state.direction &&
      this.isPlayerControlled
    ) {
      this.startBehaviour(state.map, {
        type: PERSON_WALKING,
        direction: state.direction,
      })
    }
    this.updateSprite()
  }

  startBehaviour(map, behaviour) {
    const { type, direction, time, retry } = behaviour
    this.direction = direction
    if (type === PERSON_WALKING) {
      if (map.isSpaceTaken(this.x, this.y, direction)) {
        // Face a character to the specified direction
        this.setAnimation(
          this.directionToAnimationNameMap[`idle-${this.direction}`]
        )
        if (retry) {
          setTimeout(() => {
            this.startBehaviour(map, behaviour)
          }, 10)
        }
        return
      }
      // Ready to walk
      // A character also carries a wall wherever he moves, so he doesn't overlaps with other models
      this.movingProgressRemaining = MAP_CELL_SIZE
      map.moveWall(this.x, this.y, direction)
    }

    if (type === PERSON_STAND) {
      this.isStanding = true
      setTimeout(() => {
        emitEvent(PERSON_STAND_COMPLETE, {
          who: this.objectId,
        })
        this.isStanding = false
      }, time)
    }
  }

  updatePosition() {
    const [axis, amount] = this.directionsUpdatesMap[this.direction]
    this[axis] += amount
    this.movingProgressRemaining -= 1

    if (this.movingProgressRemaining === 0) {
      emitEvent(PERSON_WALKING_COMPLETE, {
        who: this.objectId,
      })
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.setAnimation(
        this.directionToAnimationNameMap[`walk-${this.direction}`]
      )
      return
    }
    this.setAnimation(
      this.directionToAnimationNameMap[`idle-${this.direction}`]
    )
  }
}
