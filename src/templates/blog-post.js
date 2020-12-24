import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'
import Post from '../components/Post'

function Template({ data, pageContext }) {
  const { post, prev, next, site } = data

  return (
    <Layout>
      <Post post={post} prevPost={prev} nextPost={next} siteData={site} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!, $prev: String!, $next: String!) {
    site {
      siteMetadata {
        githubRepoUrl
      }
    }
    prev: markdownRemark(frontmatter: { path: { eq: $prev } }) {
      fileAbsolutePath
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        category
        featuredImg {
          colors {
            ...GatsbyImageColors
          }
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
    next: markdownRemark(frontmatter: { path: { eq: $next } }) {
      fileAbsolutePath
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        category
        featuredImg {
          colors {
            ...GatsbyImageColors
          }
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
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      fileAbsolutePath
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        isoDate: date(formatString: "YYYY-MM-DD HH:MM:SS")
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
