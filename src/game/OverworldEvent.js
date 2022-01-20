/**
 * Overworld event responsible for evoking events of any type suported by the game.
 * It has an implementation for every event type
 */
export default class OverworldEvent {
  constructor({ map, event }) {
    this.map = map
    this.event = event
  }

  run() {
    const eventNameToFunctionMap = {
      [PERSON_STAND]: this.stand.bind(this),
      [PERSON_WALKING]: this.walk.bind(this),
    }
    return new Promise((resolve) =>
      eventNameToFunctionMap[this.event.type](resolve)
    )
  }

  stand(resolve) {
    const whoId = this.event.who
    const gameObject = this.map.gameObjects[whoId]
    gameObject.startBehaviour(this.map, {
      type: PERSON_STAND,
      direction: this.event.direction,
      time: this.event.time,
    })
    const completeHandler = (event) => {
      if (whoId === event.detail.who) {
        document.removeEventListener(PERSON_STAND_COMPLETE, completeHandler)
        resolve()
      }
    }
    document.addEventListener(PERSON_STAND_COMPLETE, completeHandler)
  }

  walk(resolve) {
    const whoId = this.event.who
    const gameObject = this.map.gameObjects[whoId]
    gameObject.startBehaviour(this.map, {
      type: PERSON_WALKING,
      direction: this.event.direction,
      retry: true,
    })
    const completeHandler = (event) => {
      if (whoId === event.detail.who) {
        document.removeEventListener(PERSON_WALKING_COMPLETE, completeHandler)
        resolve()
      }
    }
    document.addEventListener(PERSON_WALKING_COMPLETE, completeHandler)
  }
}

export function emitEvent(name, detail) {
  const event = new CustomEvent(name, {
    detail,
  })
  document.dispatchEvent(event)
}

export const PERSON_STAND = "person:stand"
export const PERSON_STAND_COMPLETE = "person:stand:complete"
export const PERSON_WALKING = "person:walking"
export const PERSON_WALKING_COMPLETE = "person:walking:complete"
