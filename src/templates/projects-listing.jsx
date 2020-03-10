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
            <TileItem key={project.node.frontmatter.slug}>
              <Tile
                image={project.node.frontmatter.cover}
                reference={`/projects/${project.node.frontmatter.slug}`}
                title={project.node.frontmatter.title}
                metainfo={project.node.frontmatter.timeframes}
              />
            </TileItem>
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

const TileItem = styled.div`
  flex-basis: calc(99.9% * 1 / 3);
  height: 17rem;
  max-width: calc(99.9% * 1 / 3 - 1.25rem);
  width: calc(99.9% * 1 / 3);
  margin: 0 1.25rem 1.6rem 0;
  ${phone} {
    flex-basis: 100%;
    margin-right: 0;
    max-width: 100%;
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
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  presentationWidth
                }
              }
            }
            slug
            title
            timeframes
          }
        }
      }
    }
  }
`
