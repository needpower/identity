import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import Footer from "./Footer"
import Header from "./Header"
import { phone } from "../utils/mediaQueries"

const Layout = props => {
  const { fullWidth, leftColumn, children } = props
  return (
    <LayoutFlex>
      <Global styles={globalStyles} />
      <Header />
      <ContentWrapper fullWidth={fullWidth}>
        {leftColumn && <Sidebar>{leftColumn}</Sidebar>}
        <Content fullWidth={fullWidth} hasSidebar={leftColumn !== undefined}>
          {children}
        </Content>
      </ContentWrapper>
      <Footer />
    </LayoutFlex>
  )
}

const LayoutFlex = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  ${phone} {
    position: relative;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-wrap: nowrap;
  margin: 48px auto 0;
  max-width: ${({ fullWidth }) => (fullWidth ? "100%" : "1280px")};
  padding: ${({ fullWidth }) => (fullWidth ? "0" : "0 16px")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "1280px")};
  ${phone} {
    margin-top: 0;
    width: 100%;
  }
`

const Sidebar = styled.aside`
  width: 25%;
`

const Content = styled.main`
  width: ${({ hasSidebar }) => (hasSidebar ? "75%" : "100%")};
`

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  p {
    margin-bottom: 1rem;
  }
  a {
    text-shadow: none;
  }
`

export default Layout
