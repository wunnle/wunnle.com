import { graphql, Link } from 'gatsby'
import React from 'react'
import { Helmet } from 'react-helmet'

import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import PostList from '../components/PostList'
import SEO from '../components/Seo'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark

  const { title, description } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title={title} description={description} />
      <PostList>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return <PostCard post={post} />
          })}
      </PostList>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        social {
          twitter
        }
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            category
            date(formatString: "MMMM DD, YYYY")
            path
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
    }
  }
`
