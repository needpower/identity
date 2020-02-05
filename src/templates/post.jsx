import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import Layout from "../components/Layout"
import NonStretchedImage from "../components/NonStretchedImage"
import SocialLinks from "../components/SocialLinks"
import SEO from "../components/SEO"
import { options } from "../utils/typography"
import { phone } from "../utils/mediaQueries"

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { slug, otherPosts } = pageContext
    const postNode = data.markdownRemark
    const post = postNode.frontmatter
    const cover = post.cover && post.cover.childImageSharp.fluid
    return (
      <Layout>
        <SEO
          title={post.title}
          description={post.excerpt}
          image={cover ? cover.src : null}
          pathname={`/notes${slug}`}
          isArticle
        />
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
            <section dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <SocialLinks
              postNode={postNode}
              postPath={`/notes${slug}`}
              mobile
            />
          </PostContent>
          <OtherPostsSidebar posts={otherPosts} />
        </PostFlexContainer>
      </Layout>
    )
  }
}

function OtherPostsSidebar({ posts }) {
  return (
    <OtherPostsSection>
      <OtherPostsSectionHeader>Свежак</OtherPostsSectionHeader>
      {posts.map(post => (
        <OtherPost key={post.node.fields.slug}>
          <OtherPostTitle>
            <OtherPostLink
              to={`/notes/${post.node.fields.slug}`}
              activeClassName="active"
            >
              {post.node.frontmatter.title}
            </OtherPostLink>
            <OtherPostDate>
              {format(new Date(post.node.frontmatter.date), "dd MMMM yyyy", {
                locale: ru,
              })}
            </OtherPostDate>
          </OtherPostTitle>
        </OtherPost>
      ))}
    </OtherPostsSection>
  )
}

const OtherPostsSection = styled.aside`
  margin-top: 24px;
  padding-left: 16px;
  width: 25%;
  ${phone} {
    background-color: #f5f5f5;
    margin-top: 48px;
    padding: 16px;
    width: 100%;
  }
`

const OtherPostsSectionHeader = styled.h4`
  margin-top: 0;
  ${phone} {
    margin-bottom: 16px;
  }
`

const OtherPost = styled.div`
  margin-bottom: 1rem;
`

const OtherPostTitle = styled.div``
const OtherPostLink = styled(Link)`
  font-family: ${options.headerFontFamily.join()};
  &.active {
    border-bottom-color: transparent;
    color: hsla(0, 0%, 0%, 0.9);
    cursor: default;
  }
`
const OtherPostDate = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8rem;
`

const PostFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  ${phone} {
    flex-direction: column;
  }
`

const PostBack = styled.div`
  font-size: 1.6rem;
  width: 10%;
  ${phone} {
    width: 100%;
  }
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

const PostContent = styled.article`
  padding-left: 16px;
  padding-right: 16px;
  width: 65%;
  ${phone} {
    margin-top: 24px;
    padding: 0;
    width: 100%;
  }
`
const PostTitle = styled.h1`
  margin-top: 0;
  text-align: center;
  ${phone} {
    text-align: left;
  }
`
const PostCover = styled.section``
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
        excerpt
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
