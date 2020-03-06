import React from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

export default class ProjectTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { slug, otherProjects } = pageContext
    const project = data.markdownRemark.frontmatter
    return (
      <Layout>
        <SEO title={project.title} pathname={`/projects/${slug}`} isArticle />
        <Content>
          <Title>{project.title}</Title>
          <Timeframes>{project.timeframes}</Timeframes>
          <Result>Результат: {project.result}</Result>
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
      </Layout>
    )
  }
}

const Tech = ({ children }) => <TechItem>{children}</TechItem>

const Content = styled.section``
const Title = styled.h1`
  margin-bottom: 8px;
  margin-top: 0;
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
const Technologies = styled.div``
const TechItem = styled.span`
  background-color: #f5f5f5;
  display: inline-block;
  padding: 8px;
  &:not(:last-child) {
    margin-right: 8px;
  }
`
const Description = styled.section`
  margin-bottom: 32px;
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
