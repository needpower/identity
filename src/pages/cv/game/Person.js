import GameObject from "./GameObject"

const MAP_CELL_SIZE = 16

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
    // Grid-based movement
    // One unit of person's step = one grid cell = MAP_CELL_SIZE
    this.movingProgressRemaining = 0
  }

  update(state) {
    this.updatePosition()
    this.updateSprite(state)
    if (
      this.isPlayerControlled &&
      state.direction &&
      this.movingProgressRemaining === 0
    ) {
      this.movingProgressRemaining = MAP_CELL_SIZE
      this.direction = state.direction
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [axis, amount] = this.directionsUpdatesMap[this.direction]
      this[axis] += amount
      this.movingProgressRemaining -= 1
    }
  }

  updateSprite(state) {
    const directionToAnimationNameMap = {
      "idle-up": "idleUp",
      "walk-up": "walkUp",
      "idle-down": "idleDown",
      "walk-down": "walkDown",
      "idle-left": "idleLeft",
      "walk-left": "walkLeft",
      "idle-right": "idleRight",
      "walk-right": "walkRight",
    }

    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      !state.direction
    ) {
      this.setAnimation(directionToAnimationNameMap[`idle-${this.direction}`])
      return
    }

    if (this.movingProgressRemaining > 0) {
      this.setAnimation(directionToAnimationNameMap[`walk-${this.direction}`])
      return
    }
  }
}
