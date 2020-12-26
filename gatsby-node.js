const path = require('path')
const config = require('./gatsby-config')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              category
              path
              date
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        permalink: `${config.siteMetadata.siteUrl}${node.frontmatter.path}`,
        prev: posts[(index - 1 + posts.length) % posts.length].node.frontmatter.path,
        next: posts[(index + 1) % posts.length].node.frontmatter.path
      }
    })
  })
}
