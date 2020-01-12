import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
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
      <Layout leftColumn={<OtherPostsSidebar posts={otherPosts} />}>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <PostContent>
          <PostTitle>{post.title}</PostTitle>
          {cover && (
            <PostCover>
              <PostCoverImage fluid={cover} objectPosition="center center" />
            </PostCover>
          )}
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </PostContent>
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
            <Link to={`/watch/notes/${post.node.fields.slug}`}>
              {post.node.frontmatter.title}
            </Link>
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

const OtherPostsSection = styled.section``

const OtherPostsSectionHeader = styled.h4`
  margin-top: 0;
`

const OtherPost = styled.div`
  margin-bottom: 1rem;
`

const OtherPostTitle = styled.div``
const OtherPostDate = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8rem;
`

const PostContent = styled.section`
  padding-left: 16px;
`
const PostTitle = styled.h1`
  margin-top: 0;
`
const PostCover = styled.div``
const PostCoverImage = styled(NonStretchedImage)`
  border-radius: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 25px;
  margin-bottom: 1.6rem;
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
