import React from "react"
import styled from "@emotion/styled"
import config from "../../data/SiteConfig"

const Footer = ({ className }) => (
  <FooterBlock className={className}>{config.copyright}</FooterBlock>
)

const FooterBlock = styled.footer`
  background-color: rgba(97, 98, 71, 1);
  color: #ffffff;
  font-size: 0.8rem;
  margin-top: 16px;
  overflow: hidden;
  padding: 84px 84px 24px;
  position: relative;
  text-align: center;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    border-style: solid;
  }
  &:before {
    border-width: 0 0 64px 100vw;
    border-bottom-color: rgba(97, 98, 71, 1);
    top: 0;
  }
  &:after {
    border-width: 0 0 0 100vw;
    border-left-color: rgba(97, 98, 71, 1);
    bottom: 0;
  }
`

export default Footer
