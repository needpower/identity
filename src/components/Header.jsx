import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { options } from "../utils/typography"

const HeaderComponent = props => (
  <HeaderTag className={props.className}>
    <LogoWrapper>
      <Logo to="/">needpower</Logo>
    </LogoWrapper>
    <Nav>
      <NavLink to="/notes" partiallyActive activeClassName="active">
        Наблюдаем за процессом
      </NavLink>
      <NavLink to="/cupboard" activeClassName="active">
        Шкаф
      </NavLink>
      <NavLink to="/contacts" activeClassName="active">
        Об авторе
      </NavLink>
    </Nav>
  </HeaderTag>
)

const HeaderTag = styled.header`
  font-family: ${options.headerFontFamily.join()};
  margin: 16px auto 0;
  max-width: 1280px;
`

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: center;a
`

const NavLink = styled(Link)`
  background-image: none;
  border-bottom: 1px solid rgba(97, 98, 71, 0.7);
  color: rgba(97, 98, 71, 1);
  cursor: pointer;
  display: inline-block;
  margin: 0 16px;
  padding: 0;
  position: relative;
  text-decoration: none;
  text-shadow: inherit;
  &:hover {
    color: rgba(25, 123, 189, 1);
  }
  &.active {
    border-bottom-color: transparent;
    color: #ffffff;
    margin: 0;
    padding: 0 16px;
    text-shadow: none;
    &:hover {
      color: #ffffff;
    }
    &:before {
      background-color: rgba(97, 98, 71, 1);
      bottom: 0;
      content: "";
      top: 0;
      position: absolute;
      right: 0;
      transform: skew(-30deg);
      width: 100%;
      z-index: -1;
    }
  }
`

const LogoWrapper = styled.div`
  margin-bottom: 16px;
  text-align: center;
`

const Logo = styled(Link)`
  color: rgba(43, 174, 102, 1);
  background-image: none;
  border-bottom: none;
  display: inline-block;
  text-decoration: none;
`

const Header = styled(HeaderComponent)``
export default Header
