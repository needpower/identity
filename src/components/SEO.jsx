import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

const SEO = ({ title, description, image, pathname, isArticle }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          titleTemplate,
          defaultDescription,
          defaultImage,
          siteUrl,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image:
          image || defaultImage ? `${siteUrl}${image || defaultImage}` : null,
        url: `${siteUrl}${pathname || "/"}`,
      }
      return (
        <Helmet title={seo.title} titleTemplate={titleTemplate}>
          <link
            rel="shortcut icon"
            href="/logos/favicon.png"
            type="image/x-icon"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/logos/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/logos/favicon-16x16.png"
          />
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />
          {/* OpenGraph tags */}
          {isArticle ? <meta property="og:type" content="article" /> : null}
          <meta property="og:url" content={seo.url} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          {seo.image ? <meta property="og:image" content={seo.image} /> : null}
        </Helmet>
      )
    }}
  />
)
export default SEO
SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  isArticle: PropTypes.bool,
}
SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  isArticle: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
      }
    }
  }
`
