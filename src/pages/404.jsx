import React from "react"
import styled from "@emotion/styled"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import NonStretchedImage from "../components/NonStretchedImage"
import SEO from "../components/SEO"

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query FeaturedPosts {
      file(relativePath: { eq: "tumbleweed.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_withWebp
            presentationWidth
          }
        }
      }
    }
  `)
  return (
    <Layout fullwidth>
      <SEO
        title="Курс потерян"
        description="Вы на странице, которой нет. Предлагаю нам начать с начала"
      />
      <NotFoundSection>
        <NotFoundTitle>Ой, занесло</NotFoundTitle>
        <h3>
          Вы на странице, которой нет. Предлагаю нам начать{" "}
          <Link to="/">с начала</Link>
        </h3>
        <NotFoundImage fluid={data.file.childImageSharp.fluid} />
      </NotFoundSection>
    </Layout>
  )
}

export default NotFoundPage

const NotFoundSection = styled.section`
  text-align: center;
`
const NotFoundTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 1rem;
`
const NotFoundImage = styled(NonStretchedImage)`
  margin: 0 auto;
`
