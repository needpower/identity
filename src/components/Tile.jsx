import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import NonStretchedImage from "./NonStretchedImage"

const Tile = ({ image, reference, title, metainfo }) => (
  <TileItem>
    <TileMetaInfo dangerouslySetInnerHTML={{ __html: metainfo }} />
    <TileImageWrapper>
      <TileImage fluid={image.childImageSharp.fluid} />
    </TileImageWrapper>
    <TileLink to={reference}>
      <TileText>
        <TileTitle dangerouslySetInnerHTML={{ __html: title }} />
      </TileText>
    </TileLink>
  </TileItem>
)

export default Tile

Tile.propTypes = {
  image: PropTypes.object.isRequired,
  reference: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  metainfo: PropTypes.string,
}

Tile.defaultProps = {
  metainfo: "",
}

const TileItem = styled.div`
  box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
  flex-basis: 100%;
  position: relative;
  height: 100%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  width: 100%;
  &:hover {
    box-shadow: 0 15px 32px rgba(0, 0, 0, 0.1);
    transform: scale(1.04);
  }
`

const TileMetaInfo = styled.span`
  color: #ffffff;
  display: inline-block;
  left: 1rem;
  position: absolute;
  text-shadow: 1px 1px 4px #000000;
  top: 1rem;
  z-index: 2;
`

const TileLink = styled(Link)`
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: -10;
  }
`

const TileImageWrapper = styled.div`
  position: absolute;
  height: 100%;
  left: 0;
  object-fit: cover;
  top: 0;
  width: 100%;
  z-index: 1;
`

const TileImage = styled(NonStretchedImage)`
  height: 100%;
`

const TileText = styled.div`
  color: #f0f0f0;
  margin-bottom: 1.25rem;
  text-shadow: none;
`

const TileTitle = styled.h3`
  color: #f0f0f0;
  hyphens: auto;
  line-height: 2rem;
  margin-bottom: 0;
`
