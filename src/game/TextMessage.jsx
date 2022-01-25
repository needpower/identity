import React, { Component } from "react"
import styled from "@emotion/styled"
import KeyPressListener from "./KeyPressListener"

export default class TextMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      revealedSymbolsAmount: 0,
    }
    this.actionsListener = new KeyPressListener("Space", () => {
      if (this.state.revealedSymbolsAmount < this.props.text.length) {
        this.setState({
          revealedSymbolsAmount: this.props.text.length,
        })
      } else {
        this.props.onComplete()
      }
    })
  }
  componentDidMount() {
    this.revealSymbol()
  }
  componentDidUpdate() {
    if (this.state.revealedSymbolsAmount <= this.props.text.length) {
      this.revealSymbol()
    } else {
      clearTimeout(this.timerId)
    }
  }
  componentWillUnmount() {
    this.actionsListener.unbind()
  }
  // typewriter effect
  revealSymbol() {
    this.timerId = setTimeout(() => {
      this.setState((state) => ({
        revealedSymbolsAmount: state.revealedSymbolsAmount + 1,
      }))
    }, 70)
  }
  render() {
    return (
      <TextMessageContainer>
        <div>
          {this.props.text.split("").map((character, index) => (
            <Symbol
              key={`${character}-${index}`}
              revealed={index < this.state.revealedSymbolsAmount}
            >
              {character}
            </Symbol>
          ))}
        </div>
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
const Symbol = styled.span`
  opacity: ${({ revealed }) => (revealed ? "1" : "0")};
`
