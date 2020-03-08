import React from "react"
import styled from "@emotion/styled"
import { graphql, Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import SocialLinks from "../components/SocialLinks"
import Tile from "../components/Tile"
import { phone } from "../utils/mediaQueries"

export default class ProjectTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { slug, otherProjects } = pageContext
    const project = data.markdownRemark.frontmatter
    return (
      <Layout>
        <SEO title={project.title} pathname={`/projects/${slug}`} isArticle />
        <Content>
          <BackLink to="/projects">
            <FontAwesomeIcon icon={faArrowLeft} />
            <BackNote>Ко всем проектам</BackNote>
          </BackLink>
          <Title dangerouslySetInnerHTML={{ __html: project.title }} />
          <Timeframes
            dangerouslySetInnerHTML={{ __html: project.timeframes }}
          />
          <Result>
            Результат: <a href={project.result}>{project.result}</a>
          </Result>
        </Content>
        <Description
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
        <Technologies>
          Используемые инструменты:{" "}
          {project.technologies.map(technology => (
            <Tech key={technology}>{technology}</Tech>
          ))}
        </Technologies>
        <SocialLinks
          postNode={data.markdownRemark}
          postPath={`/projects/${slug}`}
          mobile
        />
        <OtherProjects>
          <OtherProjectsTitle>Другие проекты</OtherProjectsTitle>
          <OtherProjectsContent>
            {otherProjects.map(otherProject => (
              <TileItem key={otherProject.node.frontmatter.slug}>
                <Tile
                  image={otherProject.node.frontmatter.cover}
                  reference={`/projects/${otherProject.node.frontmatter.slug}`}
                  title={otherProject.node.frontmatter.title}
                  metainfo={otherProject.node.frontmatter.timeframes}
                />
              </TileItem>
            ))}
          </OtherProjectsContent>
        </OtherProjects>
      </Layout>
    )
  }
}

const Tech = ({ children }) => <TechItem>{children}</TechItem>

const Content = styled.section``
const Title = styled.h1`
  line-height: 1.25;
  margin-bottom: 8px;
  margin-top: 1rem;
  text-align: center;
`
const Timeframes = styled.div`
  text-align: center;
  margin-bottom: 32px;
`
const Result = styled.div`
  background-color: #f5f5f5;
  margin-bottom: 32px;
  padding: 16px;
`
const Technologies = styled.div`
  margin-bottom: 32px;
`
const TechItem = styled.span`
  background-color: #f5f5f5;
  display: inline-block;
  margin-bottom: 8px;
  padding: 8px;
  &:not(:last-child) {
    margin-right: 8px;
  }
`
const Description = styled.section`
  margin-bottom: 32px;
`

const OtherProjects = styled.aside`
  background-color: #f5f5f5;
  margin-top: 32px;
  padding: 16px;
`

const OtherProjectsTitle = styled.h3`
  margin-top: 1.25rem;
  margin-bottom: 1rem;
`
const OtherProjectsContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const TileItem = styled.div`
  flex-basis: calc(99.9% * 1 / 4);
  height: 24rem;
  max-width: calc(99.9% * 1 / 4);
  margin: 0;
  overflow: hidden;
  width: calc(99.9% * 1 / 4);
  ${phone} {
    flex-basis: 100%;
    height: 17rem;
    margin-bottom: 1.6rem;
    max-width: 100%;
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
  padding-left: 4px;
`

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        timeframes
        result
        technologies
      }
    }
  }
`
