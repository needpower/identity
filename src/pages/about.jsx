import React, { Component } from "react"
import Helmet from "react-helmet"
import Layout from "../components/Layout"
import config from "../../data/SiteConfig"

class AboutPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Об авторе | ${config.siteTitle}`} />
      </Layout>
    )
  }
}

export default AboutPage
