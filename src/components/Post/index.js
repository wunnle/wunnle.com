import React from 'react'
import Helmet from 'react-helmet'

import MeCard from '../MeCard'
import styles from './Post.module.css'

const Post = ({ postData }) => {
  const { frontmatter } = postData

  const { title, date, category, featuredImg } = frontmatter

  const imgUrl = featuredImg.childImageSharp.sizes.src

  return (
    <div className={styles.post}>
      <Helmet title={`Your Blog Name - ${title}`} />
      <MeCard date={date} />
      <div className={styles.inner}>
        <hgroup>
          <h1>{title}</h1>
          <div className={styles.details}>
            <span>{category}</span>
            <span>{postData.fields.readingTime.text}</span>
          </div>
        </hgroup>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: postData.html }}
        ></div>
      </div>
    </div>
  )
}

export default Post
