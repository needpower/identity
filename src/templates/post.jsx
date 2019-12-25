import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/Layout"
// import Disqus from "../components/Disqus/Disqus"
import SocialLinks from "../components/SocialLinks/SocialLinks"
import SEO from "../components/SEO"
import config from "../../data/SiteConfig"

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { slug } = pageContext
    const postNode = data.markdownRemark
    const post = postNode.frontmatter
    if (!post.id) {
      post.id = slug
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID
    }
    return (
      <Layout>
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

const PostContent = styled.section``

const PostTitle = styled.h1`
  text-align: center;
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
