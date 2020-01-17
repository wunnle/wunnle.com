import React from 'react'

import MeCard from '../MeCard'
import SEO from '../Seo'
import styles from './Post.module.css'

const Post = ({ postData }) => {
  const { frontmatter } = postData

  const { title, date, category, socialImg, excerpt } = frontmatter

  const imgUrl = socialImg.childImageSharp.sizes.src

  return (
    <div className={styles.post}>
      <SEO title={title} image={imgUrl} description={excerpt} />
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
