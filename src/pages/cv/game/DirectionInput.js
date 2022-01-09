export default class DirectionInput {
  constructor() {
    // for the case when player hold many keys simultaneously
    this.heldDirections = []
    this.directionsMap = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    }

    document.addEventListener("keydown", (e) => {
      const direction = this.directionsMap[e.code]
      if (direction && !this.heldDirections.includes(direction)) {
        this.heldDirections.unshift(direction)
      }
    })

    document.addEventListener("keyup", (e) => {
      const direction = this.directionsMap[e.code]
      if (direction && this.heldDirections.indexOf(direction) > -1) {
        this.heldDirections.splice(this.heldDirections.indexOf(direction), 1)
      }
    })
  }

  get direction() {
    return this.heldDirections[0]
  }
}
