import { Link } from 'gatsby'
import React from 'react'

import { hexToRgba } from '../../utils/helpers/colorHelpers'
import getPostDate from '../../utils/helpers/getPostDate'
import styles from './NextPostCard.module.css'

const NextPostCard = ({ post }) => {
  const { frontmatter } = post

  const { title, date, category, featuredImg } = frontmatter

  const imgUrl = featuredImg.childImageSharp.sizes.src
  const imgBgColors = featuredImg.colors

  return (
    <Link to={post.frontmatter.path}>
      <div
        className={styles.postCard}
        style={{
          background: `url(${imgUrl}) ${imgBgColors.darkVibrant}`,
          backgroundPositionY: '-14px'
        }}
      >
        <div
          className={styles.postCardInner}
          style={{
            background: `linear-gradient(0, ${imgBgColors.darkVibrant}, ${hexToRgba(
              imgBgColors.darkVibrant,
              0.88
            )}`
          }}
        >
          <div className={styles.category}>{category}</div>
          <h2 className={styles.title}>{title}</h2>
          <div>
            <span className={styles.date}> {getPostDate(date)}</span>
            <span className={styles.timeToRead}>{post.fields.readingTime.text}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NextPostCard
