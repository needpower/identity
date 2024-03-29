/* eslint "no-console": "off" */

const path = require("path")
const _ = require("lodash")

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
    }
    createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  createPage({
    path: "/notes",
    component: path.resolve("./src/templates/listing.jsx"),
    context: {},
  })

  createPage({
    path: "/cupboard",
    component: path.resolve("./src/templates/cupboard.jsx"),
    context: {},
  })

  createPage({
    path: "/projects",
    component: path.resolve("./src/templates/projects-listing.jsx"),
    context: {},
  })

  // Get a full list of markdown posts
  const markdownPostsQueryResult = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/content/.*.md$/" } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
            }
          }
        }
      }
    }
  `)

  if (markdownPostsQueryResult.errors) {
    console.error(markdownPostsQueryResult.errors)
    throw markdownPostsQueryResult.errors
  }

  // Post page creating
  const posts = markdownPostsQueryResult.data.allMarkdownRemark.edges
  posts.forEach((edge) => {
    createPage({
      path: `/notes${edge.node.fields.slug}`,
      component: path.resolve("./src/templates/post.jsx"),
      context: {
        slug: edge.node.fields.slug,
        otherPosts: posts
          .slice(0, 5)
          .filter((post) => post.node.fields.slug !== edge.node.fields.slug),
      },
    })
  })

  // Single project page
  const projectsLisitngPage = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/projects/.*.md$/" } }
        ) {
          edges {
            node {
              frontmatter {
                cover {
                  childImageSharp {
                    fluid(maxWidth: 320, maxHeight: 460) {
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
                timeframes
                title
              }
            }
          }
        }
      }
    `
  )

  if (projectsLisitngPage.errors) {
    console.error(projectsLisitngPage.errors)
    throw projectsLisitngPage.errors
  }

  const projects = projectsLisitngPage.data.allMarkdownRemark.edges
  projects.forEach((edge) => {
    createPage({
      path: `/projects/${edge.node.frontmatter.slug}`,
      component: path.resolve("./src/templates/project.jsx"),
      context: {
        slug: edge.node.frontmatter.slug,
        otherProjects: projects
          .filter(
            (project) =>
              project.node.frontmatter.slug !== edge.node.frontmatter.slug
          )
          .slice(0, 4),
      },
    })
  })
}
