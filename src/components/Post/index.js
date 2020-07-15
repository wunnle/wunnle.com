import React from 'react'

import EmailSubscription from '../EmailSubscription'
import MeCard from '../MeCard'
import NextPostCard from '../NextPostCard'
import SEO from '../Seo'
import GithubIcon from './github.inline.svg'
import styles from './Post.module.css'
import TwitterIcon from './twitter.inline.svg'

const Post = ({ post, prevPost, nextPost, siteData }) => {
  const { frontmatter, fileAbsolutePath, excerpt } = post

  const { title, date, category, socialImg, tweet } = frontmatter

  const imgUrl = socialImg.childImageSharp.sizes.src

  const {
    siteMetadata: { githubRepoUrl }
  } = siteData

  const editUrl =
    githubRepoUrl + '/edit/master/' + fileAbsolutePath.match(/src\/posts\/.*/i)[0]

  return (
    <div className={styles.post}>
      <SEO title={title} image={imgUrl} description={excerpt} />
      <MeCard date={date} />
      <div className={styles.inner}>
        <hgroup>
          <h1>{title}</h1>
          <div className={styles.details}>
            <span>{category}</span>
            <span>{post.fields.readingTime.text}</span>
          </div>
        </hgroup>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
      </div>
      <div className={styles.footer}>
        {tweet && (
          <a
            className={styles.twitterLink}
            target="_blank"
            rel="noopener noreferrer"
            href={tweet}
          >
            <TwitterIcon /> Discuss on Twitter
          </a>
        )}
        <a href={editUrl} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
          Edit on GitHub
        </a>
      </div>
      <EmailSubscription />
      <div className={styles.recommendedPosts}>
        <NextPostCard post={prevPost} />
        <NextPostCard post={nextPost} />
      </div>
    </div>
  )
}

export default Post
