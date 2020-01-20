import { graphql } from 'gatsby'
import React from 'react'

import Intro from '../components/Intro'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import PostList from '../components/PostList'
import SEO from '../components/Seo'

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark

  const { description } = data.site.siteMetadata

  return (
    <Layout>
      <SEO title={'Home'} description={description} />
      <Intro />
      <PostList>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return <PostCard post={post} key={post.id} />
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
      }
    }
  }
`
