import React, { Component, createRef } from "react"
import styled from "@emotion/styled"
import Overworld from "./Overworld"

const CANVAS_HEIGHT = "198px"
const CANVAS_WIDTH = "352px"

export default class CVExplorerGame extends Component {
  constructor(props) {
    super(props)
    this.gameCanvasRef = createRef()
  }
  componentDidMount() {
    this.startGame()
  }
  startGame = () => {
    const overworld = new Overworld({
      canvas: this.gameCanvasRef.current,
    })
    overworld.init()
  }
  render() {
    return (
      <Container>
        <GameCanvas
          ref={this.gameCanvasRef}
          height={CANVAS_HEIGHT}
          width={CANVAS_WIDTH}
        />
      </Container>
    )
  }
}

const Container = styled.div`
  margin: 240px auto;
  position: relative;
  height: ${CANVAS_HEIGHT};
  width: ${CANVAS_WIDTH};
  outline: 1px solid orange;
  transform: scale(3);
`

const GameCanvas = styled.canvas`
  image-rendering: pixelated;
`
