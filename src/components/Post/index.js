import React from 'react'
import Helmet from 'react-helmet'

import styles from './Post.module.css'

const Post = ({ postData }) => {
  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${postData.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{postData.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: postData.html }}
        />
      </div>
    </div>
  )
}

export default Post
