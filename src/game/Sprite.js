import { CAMERA_NUDGE_X, CAMERA_NUDGE_Y, MAP_CELL_SIZE } from "./config"
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
    // how long (in FPS) each animation frame should be on a screen
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
    // Downtick the animation progress of a single frame. Don't stop until it's finished
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

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + withGrid(CAMERA_NUDGE_X) - cameraPerson.x
    const y = this.gameObject.y - 16 + withGrid(CAMERA_NUDGE_Y) - cameraPerson.y
    const [frameX, frameY] = this.frame
    const FRAME_WIDTH = 32
    const FRAME_HEIGHT = 32
    ctx.drawImage(this.shadow, x, y)
    ctx.drawImage(
      this.image,
      frameX * FRAME_WIDTH,
      frameY * FRAME_HEIGHT,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      x,
      y,
      FRAME_WIDTH,
      FRAME_HEIGHT
    )
    this.updateAnimationProgress()
  }
}

// Normalize value to move object around the map by adding/subtracting 1
function withGrid(value) {
  return Number(value) * MAP_CELL_SIZE
}
