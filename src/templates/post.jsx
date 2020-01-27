import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import Layout from "../components/Layout"
import NonStretchedImage from "../components/NonStretchedImage"
import SEO from "../components/SEO"
import config from "../../data/SiteConfig"

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { slug, otherPosts } = pageContext
    const postNode = data.markdownRemark
    const post = postNode.frontmatter
    const cover = post.cover && post.cover.childImageSharp.fluid
    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <PostFlexContainer>
          <PostBack>
            <BackLink to="/notes">
              <BackNote>Ко всем постам</BackNote>
              <FontAwesomeIcon icon={faArrowLeft} />
            </BackLink>
          </PostBack>
          <PostContent>
            <PostTitle>{post.title}</PostTitle>
            {cover && (
              <PostCover>
                <PostCoverImage fluid={cover} objectPosition="center center" />
              </PostCover>
            )}
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          </PostContent>
        </PostFlexContainer>
      </Layout>
    )
  }
}

const PostFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const PostBack = styled.div`
  font-size: 1.6rem;
  width: 10%;
`

const BackLink = styled(Link)`
  border-bottom: none;
  display: inline-block;
  line-height: 1.2rem;
`

const BackNote = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  width: 100%;
`

const PostContent = styled.section`
  padding-left: 16px;
  width: 90%;
`
const PostTitle = styled.h1`
  margin-top: 0;
  text-align: center;
`
const PostCover = styled.div``
const PostCoverImage = styled(NonStretchedImage)`
  border-radius: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 25px;
  margin: 0 auto 1.6rem;
`

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            fluid(maxWidth: 860) {
              ...GatsbyImageSharpFluid_withWebp
              presentationWidth
            }
          }
        }
        date
        category
      }
      fields {
        slug
      }
    }
  }
`
