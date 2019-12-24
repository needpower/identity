import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import React, { Component } from "react"
import Intro from "../components/Intro"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default class Listing extends Component {
  render() {
    const { data } = this.props
    return (
      <Layout fullWidth>
        <Intro>
          <p>
            Если только херачить не оглядываясь, по методу just... do it!, могу
            забыть, зачем вообще начинал. Беру на себя ответственность
            оглянуться через любое время, и вместо того, чтобы говорить:
            &laquo;да, быстро время летит&raquo; &mdash; увидеть &laquo;вот
            так-то проходит время&raquo;
          </p>
          <p>
            Добро пожаловать в хронику, где показываю, что узнал и что делаю.
          </p>
        </Intro>
        <SEO />

        <Articles>
          {data.allMarkdownRemark.edges.map(post => (
            <Article key={post.node.fields.slug}>
              <ArticleMeta>{post.node.frontmatter.date}</ArticleMeta>
              <header>
                <ArticleHeader>
                  <Link to={`/notes/${post.node.fields.slug}`}>
                    {post.node.frontmatter.title}
                  </Link>
                </ArticleHeader>
              </header>
              <ArticleBrief>{post.node.excerpt}</ArticleBrief>
            </Article>
          ))}
        </Articles>
      </Layout>
    )
  }
}

const Articles = styled.section`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 16px;
`
const Article = styled.article`
  margin-bottom: 4rem;
`
const ArticleHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
`
const ArticleMeta = styled.footer`
  color: rgba(0, 0, 0, 0.4);
`
const ArticleBrief = styled.p``

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            cover
            date
          }
        }
      }
    }
  }
`
