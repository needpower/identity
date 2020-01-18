import React from "react"
import { Global, css } from "@emotion/core"
import styled from "@emotion/styled"
import Footer from "./Footer"
import Header from "./Header"

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
      <LayoutFooter />
    </LayoutFlex>
  )
}

const LayoutFlex = styled.div`
  min-height: 100vh;
  position: relative;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 48px auto 0;
  max-width: ${({ fullWidth }) => (fullWidth ? "100%" : "1280px")};
  padding: ${({ fullWidth }) => (fullWidth ? "0" : "0 16px")};
`

const Sidebar = styled.aside`
  width: 25%;
`

const Content = styled.main`
  width: ${({ hasSidebar }) => (hasSidebar ? "75%" : "100%")};
`

const LayoutFooter = styled(Footer)`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  p {
    margin-bottom: 1rem;
  }
`

export default Layout
