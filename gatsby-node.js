/* eslint "no-console": "off" */

const path = require("path")
const _ = require("lodash")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node, actions, getNode }) => {
  // Convert any absolute path in markdown frontmatter data
  // into relative paths if a matching file is found
  fmImagesToRelative(node)
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
    }
    createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const listingPage = path.resolve("./src/templates/listing.jsx")
  createPage({
    path: "/watch/notes",
    component: listingPage,
    context: {},
  })

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark(
        limit: 5
        sort: { fields: frontmatter___date, order: DESC }
      ) {
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

  // Post page creating
  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges
  const postPage = path.resolve("./src/templates/post.jsx")
  postsEdges.forEach(edge => {
    // Create post pages
    const otherPosts = postsEdges.filter(
      post => post.node.fields.slug !== edge.node.fields.slug
    )

    createPage({
      path: `/watch/notes${edge.node.fields.slug}`,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        otherPosts,
      },
    })
  })
}
