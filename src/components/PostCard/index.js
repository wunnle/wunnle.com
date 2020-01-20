import { Link } from 'gatsby'
import React from 'react'

import styles from './PostCard.module.css'

const PostCard = ({ post }) => {
  const { frontmatter } = post

  const { title, date, category, featuredImg } = frontmatter

  const imgUrl = featuredImg.childImageSharp.sizes.src
  const imgBgColors = featuredImg.colors

  return (
    <Link to={post.frontmatter.path}>
      <div
        className={styles.postCard}
        style={{
          background: `url(${imgUrl}) ${imgBgColors.darkVibrant}`
        }}
      >
        <div className={styles.postCardInner}>
          <div className={styles.category}>{category}</div>
          <h2 className={styles.title}>{title}</h2>
          <div>
            <span className={styles.date}>{date}</span>
            <span className={styles.timeToRead}>{post.fields.readingTime.text}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
