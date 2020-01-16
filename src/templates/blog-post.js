import { graphql } from 'gatsby'
import React from 'react'

import Post from '../components/Post'

function Template({ data }) {
  const { markdownRemark: post } = data

  return <Post postData={post} />
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

export default Template
