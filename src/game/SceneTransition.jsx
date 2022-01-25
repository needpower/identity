import React, { Component } from "react"
import { keyframes, css } from "@emotion/react"

export default class SceneTransition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeOut: false,
    }
  }
  render() {
    return (
      <div
        onAnimationEndCapture={() => {
          this.props.onComplete()
          if (!this.state.fadeOut) {
            this.setState({
              fadeOut: true,
            })
          }
        }}
        css={css`
          ${base};
          animation: ${this.state.fadeOut ? fadeOut : fadeIn} 0.4s forwards;
        `}
      />
    )
  }
}

const base = css`
  background-color: #000000;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from: {
    opacity: 1;
  }
  to: {
    opacity: 0;
  }
`
