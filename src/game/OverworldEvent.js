import React from "react"
import TextMessage from "./TextMessage"
import { render, unmountComponentAtNode } from "react-dom"

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
      [DISPLAY_MESSAGE]: this.displayMessage.bind(this),
      [CHANGE_MAP]: this.changeMap.bind(this),
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

  displayMessage(resolve) {
    if (this.event.faceHero) {
      const gameObject = this.map.gameObjects[this.event.faceHero]
      const hero = this.map.gameObjects["hero"]
      const heroOppositeDirection = oppositeDirection(hero.direction)
      gameObject.direction = heroOppositeDirection
    }
    const message = React.createElement(
      TextMessage,
      {
        onComplete: () => {
          unmountComponentAtNode(document.getElementById("text-message"))
          resolve()
        },
      },
      this.event.text
    )
    render(message, document.getElementById("text-message"))
  }

  changeMap(resolve) {
    this.map.overworld.startMap(this.event.map)
    resolve()
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
export const DISPLAY_MESSAGE = "message:display"
export const CHANGE_MAP = "map:change"

function oppositeDirection(direction) {
  switch (direction) {
    case "up":
      return "down"
    case "down":
      return "up"
    case "left":
      return "right"
    case "right":
      return "left"
    default:
      return direction
  }
}
