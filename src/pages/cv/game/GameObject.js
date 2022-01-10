import Sprite from "./Sprite"
import heroImage from "./images/characters/people/hero.png"

export default class GameObject {
  constructor(config) {
    this.x = config.x || 0
    this.y = config.y || 0
    this.direction = config.direction || "down"
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

  setAnimation(name) {
    this.sprite.setAnimation(name)
  }
}
