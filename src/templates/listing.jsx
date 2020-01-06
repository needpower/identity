import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import React, { Component } from "react"
import Helmet from "react-helmet"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import Intro from "../components/Intro"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import config from "../../data/SiteConfig"

export default class Listing extends Component {
  render() {
    const { data } = this.props
    return (
      <Layout fullWidth>
        <Helmet title={`Наблюдаем за процессом | ${config.siteTitle}`} />

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
              <header>
                <ArticleHeader>
                  <Link to={`/notes/${post.node.fields.slug}`}>
                    {post.node.frontmatter.title}
                  </Link>
                </ArticleHeader>
              </header>
              <ArticleMeta>
                {format(new Date(post.node.frontmatter.date), "dd MMMM yyyy", {
                  locale: ru,
                })}
              </ArticleMeta>
              <ArticleBrief>{post.node.frontmatter.excerpt}</ArticleBrief>
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
  margin-bottom: 0.4rem;
`
const ArticleMeta = styled.footer`
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 0.8rem;
`
const ArticleBrief = styled.p``

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            cover
            excerpt
            date
          }
        }
      }
    }
  }
`
