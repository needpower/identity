import React from "react"
import { Link } from "gatsby"
import { options } from "../utils/typography"
import styled from "@emotion/styled"

const HeaderComponent = props => (
  <HeaderTag className={props.className}>
    <LogoWrapper>
      <Logo>needpower</Logo>
    </LogoWrapper>
    <Nav>
      <NavLink to="/notes" isActive={isActive("/notes")}>
        Наблюдаем за процессом
      </NavLink>
      <NavLink to="/cupboard" isActive={isActive("/cupboard")}>
        Шкаф
      </NavLink>
      <NavLink to="/contacts" isActive={isActive("/contacts")}>
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
  ${({ isActive }) => `
    background-image: none;
    border-bottom: ${isActive ? "none" : "1px solid rgba(97, 98, 71, 0.7)"};
    color: ${isActive ? "#ffffff" : "rgba(97, 98, 71, 1)"};
    cursor: ${isActive ? "default" : "pointer"};
    display: inline-block;
    margin: 0 16px;
    padding: ${isActive ? "0 16px" : "0"};
    position: relative;
    text-decoration: none;
    text-shadow: ${isActive ? "none" : "inherit"};
    &:hover {
      color: ${isActive ? "#ffffff" : "rgba(25, 123, 189, 1)"};
    }
    ${isActive &&
      `
      &:before {
        background-color: rgba(97, 98, 71, 1);
        bottom: 0;
        content: '';
        top: 0;
        position: absolute;
        right: 0;
        transform: skew(-30deg);
        width: 100%;
        z-index: -1;
      }
    `};
    
  `}
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

const isActive = path => window.location.pathname === path

export const Header = styled(HeaderComponent)``
