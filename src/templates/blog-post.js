import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'
import Post from '../components/Post'

function Template({ data }) {
  const { markdownRemark: post, site } = data

  return (
    <Layout>
      <Post postData={post} siteData={site} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        githubRepoUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      fileAbsolutePath
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        category
        tweet
        featuredImg {
          childImageSharp {
            sizes(maxWidth: 630) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        socialImg {
          childImageSharp {
            sizes(maxWidth: 630) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`

export default Template
