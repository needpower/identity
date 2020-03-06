import styled from "@emotion/styled"
import { graphql } from "gatsby"
import React, { Component } from "react"
import Intro, { IntroLink } from "../components/Intro"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Tile from "../components/Tile"
import { phone } from "../utils/mediaQueries"

export default class Listing extends Component {
  render() {
    const {
      data: {
        allMarkdownRemark: { edges: projects },
      },
    } = this.props
    return (
      <Layout fullWidth>
        <SEO
          title="Проекты"
          description="Описание проектов, в которых принимал участие. О работе в компаниях"
        />
        <Intro>
          <p>Рассказываю про проекты, в которых принимал участие.</p>
          <p>
            О&nbsp;работе в&nbsp;компаниях&nbsp;&mdash; на{" "}
            <IntroLink href="https://www.linkedin.com/in/artem-lyubchuk-88185414a/">
              LinkedIn
            </IntroLink>
          </p>
        </Intro>
        <TilesContainer>
          {projects.map(project => (
            <Tile
              key={project.node.frontmatter.slug}
              image={project.node.frontmatter.cover}
              reference={`/projects/${project.node.frontmatter.slug}`}
              title={project.node.frontmatter.title}
            />
          ))}
        </TilesContainer>
      </Layout>
    )
  }
}

const TilesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 1280px;
  max-width: 1280px;
  margin: 0 auto;
  ${phone} {
    max-width: 100%;
    padding: 0 16px 24px;
    width: 100%;
  }
`

export const projectsQuery = graphql`
  query ProjectsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/.*.md$/" } }
    ) {
      edges {
        node {
          frontmatter {
            cover {
              childImageSharp {
                fluid(maxWidth: 640) {
                  ...GatsbyImageSharpFluid_withWebp
                  presentationWidth
                }
              }
            }
            slug
            title
          }
        }
      }
    }
  }
`
