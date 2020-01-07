import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import config from "../../data/SiteConfig"

export default () => {
  const data = useStaticQuery(graphql`
    query SampleFile {
      file(relativePath: { eq: "Cover-Me-Up-Lyrics-Morgan-Wallen.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1280) {
            src
            srcSet
            srcSetWebp
            srcWebp
            sizes
            aspectRatio
            base64
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <Helmet title={`Главная | ${config.siteTitle}`} />
      <Img fluid={data.file.childImageSharp.fluid} alt="Sample image" />
    </Layout>
  )
}
