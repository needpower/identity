import shadowImage from "./images/characters/shadow.png"

export default class Sprite {
  constructor(config) {
    this.gameObject = config.gameObject

    // Sprite
    this.image = new Image()
    this.image.src = config.src

    // Shadow
    this.shadow = new Image()
    this.useShadow = config.useShadow || false
    if (this.useShadow) {
      this.shadow.src = shadowImage
    }

    // Animations
    this.animations = config.animations || {
      idleDown: [[0, 0]],
      walkDown: [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      idleRight: [[0, 1]],
      walkRight: [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      idleUp: [[0, 2]],
      walkUp: [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      idleLeft: [[0, 3]],
      walkLeft: [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    }

    this.currentAnimation = config.currentAnimation || "idleDown"
    this.currentAnimationFrame = 0
    // how fast (in frames) animation should change
    this.animationFrameLimit = config.animationFrameLimit || 8
    this.animationFrameProgress = config.animationFrameLimit
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(animationName) {
    if (this.currentAnimation !== animationName) {
      this.currentAnimation = animationName
      this.currentAnimationFrame = 0
      this.animationFrameProgress = this.animationFrameLimit
    }
  }

  updateAnimationProgress() {
    // Downtick the animation progress. Don't stop until it finished
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1
      return
    }

    // Reset the counter and switch to the next animation frame
    // In case when previous frame animation was finished
    this.animationFrameProgress = this.animationFrameLimit
    this.currentAnimationFrame += 1
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }
  }

  draw(ctx) {
    const x = this.gameObject.x - 8
    const y = this.gameObject.y - 16
    const [frameX, frameY] = this.frame
    ctx.drawImage(this.shadow, x, y)
    ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32)
    this.updateAnimationProgress()
  }
}
