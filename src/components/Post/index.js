import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import EmailSubscription from '../EmailSubscription'
import MeCard from '../MeCard'
import NextPostCard from '../NextPostCard'
import SEO from '../Seo'
import Webmentions from '../Webmentions'
import GithubIcon from './github.inline.svg'
import styles from './Post.module.css'
import TwitterIcon from './twitter.inline.svg'

const Post = ({ post, prevPost, nextPost, siteData, mentions }) => {
  const {
    site: {
      siteMetadata: { siteUrl }
    }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )

  const { frontmatter, fileAbsolutePath, excerpt } = post

  const { title, date, category, socialImg, tweet, path, isoDate } = frontmatter

  const imgUrl = socialImg.childImageSharp.sizes.src

  const {
    siteMetadata: { githubRepoUrl }
  } = siteData

  const editUrl =
    githubRepoUrl + '/edit/master/' + fileAbsolutePath.match(/src\/posts\/.*/i)[0]

  return (
    <article className={[styles.post, 'h-card', 'h-entry'].join(' ')}>
      <a className="u-url" style={{ display: 'none' }} href={`${siteUrl}${path}`}>
        Link to the post
      </a>
      <p className="p-summary e-content" style={{ display: 'none' }}>
        {excerpt}
      </p>
      <SEO title={title} image={imgUrl} description={excerpt} />
      <MeCard date={date} />
      <time className="dt-published" dateTime={isoDate} style={{ display: 'none' }}>
        {isoDate}
      </time>
      <div className={styles.inner}>
        <hgroup>
          <h1 className="p-name">{title}</h1>
          <div className={styles.details}>
            <span className="p-category">{category}</span>
            <span>{post.fields.readingTime.text}</span>
          </div>
        </hgroup>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.html }}
        ></div>
      </div>
      <Webmentions mentions={mentions} />
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
    </article>
  )
}

export default Post
