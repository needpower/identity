import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import Header from "./Header"

const Layout = props => {
  const { fullWidth, children } = props
  return (
    <Wrapper>
      <Global styles={globalStyles} />
      <Header />
      <Content fullWidth={fullWidth}>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Content = styled.main`
  margin: 48px auto 0;
  max-width: ${({ fullWidth }) => (fullWidth ? "100%" : "1280px")};
  padding: ${({ fullWidth }) => (fullWidth ? "0" : "0 16px")};
`

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
`

export default Layout
