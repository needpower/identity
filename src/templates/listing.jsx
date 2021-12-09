import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import React, { Component } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import Intro from "../components/Intro"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default class Listing extends Component {
  render() {
    const { data } = this.props
    return (
      <Layout fullWidth>
        <SEO
          title="Говорить - не мешки ворочать"
          description="Если только херачить не оглядываясь, по методу just... do it!, могу
            забыть, зачем вообще начинал. Добро пожаловать в хронику, где показываю, что узнал и что делаю."
        />
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
        <Articles>
          {data.allMarkdownRemark.edges.map((post) => {
            const { slug } = post.node.fields
            const { date: dateISO, excerpt, title } = post.node.frontmatter
            return (
              <Article key={slug}>
                <header>
                  <ArticleHeader>
                    <Link
                      to={`/notes${slug}`}
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                  </ArticleHeader>
                </header>
                <ArticleBrief dangerouslySetInnerHTML={{ __html: excerpt }} />
                <ArticleMeta>
                  {format(new Date(dateISO), "dd MMMM yyyy", {
                    locale: ru,
                  })}
                </ArticleMeta>
              </Article>
            )
          })}
        </Articles>
      </Layout>
    )
  }
}

const Articles = styled.div`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 16px 24px;
`
const Article = styled.article`
  margin-bottom: 2.4rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const ArticleHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 0.4rem;
`
const ArticleMeta = styled.footer`
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8rem;
`

const ArticleBrief = styled.p`
  margin-bottom: 0.4rem;
`

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/content/.*.md$/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          frontmatter {
            title
            excerpt
            date
          }
        }
      }
    }
  }
`
