import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'
import Post from '../components/Post'

function Template({ data }) {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <Post postData={post} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        category
        featuredImg {
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
