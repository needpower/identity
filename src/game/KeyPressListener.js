export default class KeyPressListener {
  constructor(keyCode, callback) {
    let keySafe = true
    this.onKeyDown = (e) => {
      if (e.code === keyCode && keySafe) {
        keySafe = false
        callback()
      }
    }
    this.onKeyUp = (e) => {
      if (e.code === keyCode) {
        keySafe = true
      }
    }
    document.addEventListener("keydown", this.onKeyDown)
    document.addEventListener("keyup", this.onKeyUp)
  }

  unbind() {
    document.removeEventListener("keydown", this.onKeyDown)
    document.removeEventListener("keyup", this.onKeyUp)
  }
}
