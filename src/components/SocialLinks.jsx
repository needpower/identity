import React, { Component } from "react"
import {
  FacebookShareButton,
  TelegramShareButton,
  FacebookShareCount,
  FacebookIcon,
  TelegramIcon,
  VKShareButton,
  VKIcon,
  VKShareCount,
} from "react-share"
import styled from "@emotion/styled"
import urljoin from "url-join"
import config from "../../data/SiteConfig"

class SocialLinks extends Component {
  render() {
    const { postNode, postPath, mobile } = this.props
    const post = postNode.frontmatter
    const url = urljoin(config.siteUrl, config.pathPrefix, postPath)
    const iconSize = mobile ? 36 : 48
    const filter = count => (count > 0 ? count : "")
    const renderShareCount = count => <ShareCount>{filter(count)}</ShareCount>

    return (
      <SocialLinksList>
        <SocialLinksTitle>Этим стоит поделиться:</SocialLinksTitle>
        <FacebookShareButton url={url} quote={postNode.excerpt}>
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url}>
            {count => renderShareCount(count)}
          </FacebookShareCount>
        </FacebookShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon round size={iconSize} />
        </TelegramShareButton>
        <VKShareButton url={url} title={post.title}>
          <VKIcon round size={iconSize} />
          <VKShareCount url={url}>
            {count => renderShareCount(count)}
          </VKShareCount>
        </VKShareButton>
      </SocialLinksList>
    )
  }
}

const SocialLinksList = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  a {
    border-bottom: none;
  }
  button {
    margin-right: 8px;
  }
`
const SocialLinksTitle = styled.h5`
  margin: 0 8px 0 0;
`
const ShareCount = styled.div`
  text-align: center;
`

export default SocialLinks
