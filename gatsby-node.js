/* eslint "no-console": "off" */

const path = require("path")
const _ = require("lodash")
const moment = require("moment")
const siteConfig = require("./data/SiteConfig")

exports.onCreateNode = ({ node, actions, getNode }) => {
  // transform url of each node from any_Case to kebab-case
  const { createNodeField } = actions
  let slug
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat)
        if (!date.isValid) {
          console.warn(`WARNING: Invalid date.`, node.frontmatter)
        }
        createNodeField({ node, name: "date", value: date.toISOString() })
      }
    }
    createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              category
              date
            }
          }
        }
      }
    }
  `)

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors)
    throw markdownQueryResult.errors
  }

  const listingPage = path.resolve("./src/templates/listing.jsx")
  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges

  createPage({
    path: "/notes",
    component: listingPage,
    context: {},
  })

  // Post page creating
  const postPage = path.resolve("./src/templates/post.jsx")
  postsEdges.forEach((edge, index) => {
    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1
    const nextEdge = postsEdges[nextID]
    const prevEdge = postsEdges[prevID]

    createPage({
      path: `/notes${edge.node.fields.slug}`,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    })
  })
}
