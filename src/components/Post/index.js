import React from 'react'

import MeCard from '../MeCard'
import SEO from '../Seo'
import styles from './Post.module.css'
import Twitter from './twitter.inline.svg'

const Post = ({ postData }) => {
  const { frontmatter } = postData

  const { title, date, category, socialImg, excerpt, tweet } = frontmatter

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
      {tweet && (
        <a
          className={styles.twitterLink}
          target="_blank"
          rel="noopener noreferrer"
          href={tweet}
        >
          <Twitter /> Discuss on Twitter
        </a>
      )}
    </div>
  )
}

export default Post
