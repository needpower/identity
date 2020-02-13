import React, { useState, useCallback } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"
import { options } from "../utils/typography"
import { phone } from "../utils/mediaQueries"

function HeaderComponent({ className }) {
  const [isMenuOpened, toggleMenu] = useState(false)
  const toggleMobileMenu = useCallback(() => toggleMenu(!isMenuOpened), [
    isMenuOpened,
    toggleMenu,
  ])
  return (
    <>
      <HeaderTag className={className}>
        <LogoWrapper>
          <MobileMenuTrigger onClick={toggleMobileMenu}>
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              size="1x"
              rotation={isMenuOpened ? 180 : null}
            />
          </MobileMenuTrigger>
          <Logo to="/">needpower</Logo>
        </LogoWrapper>
      </HeaderTag>
      <Nav isMenuOpened={isMenuOpened}>
        <NavLink to="/notes" partiallyActive activeClassName="active">
          Говорить
        </NavLink>
        <NavLink to="/projects" partiallyActive activeClassName="active">
          Мешки ворочать
        </NavLink>
        <NavLink to="/cupboard" activeClassName="active">
          Шкаф
        </NavLink>
      </Nav>
    </>
  )
}

const HeaderTag = styled.header`
  font-family: ${options.headerFontFamily.join()};
  height: 48px;
  margin: 16px auto 0;
  max-width: 1280px;
  position: relative;
  ${phone} {
    width: 100%;
    z-index: 11;
  }
`

const MobileMenuTrigger = styled.span`
  color: rgba(97, 98, 71, 1);
  cursor: pointer;
  display: none;
  left: 40px;
  position: absolute;
  ${phone} {
    display: inline-block;
  }
`

const Nav = styled.nav`
  align-items: center;
  display: flex;
  font-family: ${options.headerFontFamily.join()};
  justify-content: center;
  transform: translateX(0);
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  ${phone} {
    align-items: flex-start;
    background-color: #ffffff;
    box-shadow: 1px 0 16px rgba(97, 98, 71, 0.7);
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    left: 0;
    padding: 72px 16px 0 24px;
    position: absolute;
    top: 0;
    transform: ${({ isMenuOpened }) =>
      isMenuOpened ? "translateX(0)" : "translateX(-336px)"};
    width: 320px;
    z-index: 10;
  }
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
  ${phone} {
    margin-bottom: 8px;
  }
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
  position: relative;
  text-align: center;
  ${phone} {
    margin-bottom: 0;
  }
`

const Logo = styled(Link)`
  color: #ffffff;
  background-color: rgba(97, 98, 71, 1);
  background-image: none;
  border-bottom: none;
  display: inline-block;
  padding: 0 8px;
  position: relative;
  text-decoration: none;
  &:hover {
    color: #ffffff;
  }
  &:before {
    background-color: rgba(97, 98, 71, 1);
    content: "";
    top: -4px;
    position: absolute;
    right: 0;
    border-style: solid;
    border-width: 0 0 4px 112px;
    border-bottom-color: rgba(97, 98, 71, 1);
    width: 100%;
    z-index: -1;
  }
`

const Header = styled(HeaderComponent)``
export default Header
