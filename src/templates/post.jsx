import React from "react"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import Layout from "../components/Layout"
// import Disqus from "../components/Disqus/Disqus"
import SocialLinks from "../components/SocialLinks/SocialLinks"
import SEO from "../components/SEO"
import config from "../../data/SiteConfig"

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { slug, otherPosts } = pageContext
    const postNode = data.markdownRemark
    const post = postNode.frontmatter
    return (
      <Layout leftColumn={<OtherPostsSidebar posts={otherPosts} />}>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <PostContent>
          <PostTitle>{post.title}</PostTitle>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <SocialLinks postPath={slug} postNode={postNode} />
          {/* <Disqus postNode={postNode} /> */}
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
            <Link to={`/notes/${post.node.fields.slug}`}>
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

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
      }
      fields {
        slug
      }
    }
  }
`
