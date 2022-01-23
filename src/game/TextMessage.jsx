import React, { Component } from "react"
import styled from "@emotion/styled"
import KeyPressListener from "./KeyPressListener"

export default class TextMessage extends Component {
  constructor(props) {
    super(props)
    this.actionsListener = new KeyPressListener("Space", () => {
      this.props.onComplete()
    })
  }
  componentWillUnmount() {
    this.actionsListener.unbind()
  }
  render() {
    return (
      <TextMessageContainer>
        <div>{this.props.children}</div>
        <button className="next" onClick={this.props.onComplete}>
          Next
        </button>
      </TextMessageContainer>
    )
  }
}

const TextMessageContainer = styled.div`
  background-color: gray;
  padding: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 32px;
  width: 100%;
  & .next {
    position: absolute;
    right: 0;
  }
`
