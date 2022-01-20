import Sprite from "./Sprite"
import heroImage from "./images/characters/people/hero.png"
import OverworldEvent from "./OverworldEvent"

export default class GameObject {
  constructor(config) {
    this.objectId = undefined
    this.isMounted = false
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
    this.behaviourLoop = config.behaviourLoop || []
    this.behaviourLoopEventsIndex = 0
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || heroImage,
      useShadow: config.useShadow,
    })
  }

  draw(ctx, cameraPerson) {
    this.sprite.draw(ctx, cameraPerson)
  }

  update(state) {}

  // Essentially, this method is used for connection between object, and a map where it placed
  mount(map, objectId) {
    this.isMounted = true
    this.objectId = objectId
    map.addWall(this.x, this.y)
    setTimeout(() => {
      this.doBehaviourLoop(map)
    }, 20)
  }

  async doBehaviourLoop(map) {
    if (map.isCutscenePlaying || this.behaviourLoop.length === 0) {
      return
    }
    const eventConfig = this.behaviourLoop[this.behaviourLoopEventsIndex]
    const overworldEvent = new OverworldEvent({
      map,
      event: { ...eventConfig, who: this.objectId },
    })
    await overworldEvent.run()
    this.behaviourLoopEventsIndex += 1
    if (this.behaviourLoopEventsIndex === this.behaviourLoop.length) {
      this.behaviourLoopEventsIndex = 0
    }
    // As it's a loop, repeat it recursively
    this.doBehaviourLoop(map)
  }

  setAnimation(name) {
    this.sprite.setAnimation(name)
  }
}
