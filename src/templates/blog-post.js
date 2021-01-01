import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../components/Layout'
import Post from '../components/Post'

function Template({ data, pageContext }) {
  const { post, prev, next, site, mentions } = data

  return (
    <Layout>
      <Post
        post={post}
        prevPost={prev}
        nextPost={next}
        siteData={site}
        mentions={mentions.nodes}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath(
    $path: String!
    $prev: String!
    $next: String!
    $permalink: String!
  ) {
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
    mentions: allWebMentionEntry(
      filter: { wmTarget: { eq: $permalink } }
      sort: { fields: wmReceived, order: ASC }
    ) {
      nodes {
        wmTarget
        wmProperty
        wmReceived(formatString: "MMMM DD, YYYY")
        wmId
        type
        url
        likeOf
        author {
          url
          type
          photo
          name
        }
        content {
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
