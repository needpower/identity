import React, { Component } from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Intro from "../components/Intro"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default class Cupboard extends Component {
  render() {
    const {
      data: {
        allMarkdownRemark: { edges: cupboard },
      },
    } = this.props
    return (
      <Layout fullWidth>
        <SEO
          title="Шкаф"
          description="Здесь складываются видосы, статьи, заметки, картинки, которые меня
          поддёрнули. Основная цель - уловить смену интересов. А чё,
          занятно будет глянуть, как менялся фокус."
        />
        <Intro>
          Ни&nbsp;для кого не&nbsp;секрет (это ирония, возможно для кого-то
          и&nbsp;секрет), что все рассказы, мнения, доступные технологии
          и&nbsp;информация формируют наше поведение. И&nbsp;это нормально.
          Здесь складываются видосы, статьи, заметки, картинки, которые меня
          поддёрнули. Основная цель &mdash; уловить смену интересов. А&nbsp;чё,
          занятно будет глянуть, как менялся фокус.
        </Intro>
        <CupboardList>
          {cupboard.map(post => {
            const { origin, title, association } = post.node.frontmatter
            return (
              <CupboardReference>
                <CupboardHeader>
                  <OutboundLink href={origin}>
                    <CupboardReferecneTitle>{title}</CupboardReferecneTitle>
                    <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
                  </OutboundLink>
                </CupboardHeader>
                <CupboardBrief>{association}</CupboardBrief>
              </CupboardReference>
            )
          })}
        </CupboardList>
      </Layout>
    )
  }
}

const CupboardList = styled.section`
  margin: 0 auto;
  max-width: 1280px;
  padding: 0 16px 24px;
`
const CupboardReference = styled.article`
  margin-bottom: 4rem;
`
const CupboardReferecneTitle = styled.span`
  padding-right: 0.5rem;
`
const CupboardHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 0.4rem;
`
const CupboardBrief = styled.div``

export const cupboardListingQuery = graphql`
  query Cupboard {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/cupboard/.*.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            origin
            title
            association
          }
        }
      }
    }
  }
`
