import React from 'react'

import styles from './Webmentions.module.css'

const wpType = {
  'like-of': 'liked',
  'in-reply-to': 'replied',
  'repost-of': 'posted'
}

const Webmentions = ({ mentions }) => {
  const likesCount = mentions.filter(m => m.wmProperty === 'like-of').length
  const replyCount = mentions.filter(m => m.wmProperty === 'in-reply-to').length
  const postCount = mentions.filter(m => m.wmProperty === 'repost-of').length

  if (mentions.length === 0) {
    return null
  }

  return (
    <div className={styles.container}>
      <hgroup className={styles.titleGroup}>
        <h3 className={styles.title}>Mentions</h3>
        <p className={styles.counts}>
          {[
            postCount > 0 && `${postCount} posts`,
            replyCount > 0 && `${replyCount} replies`,
            likesCount > 0 && `${likesCount} likes`
          ]
            .filter(a => a)
            .join(', ')}
        </p>
      </hgroup>
      {mentions.map(m => (
        <div key={m.wmId} className={styles.mention}>
          <div className={styles.profilePhotoHolder}>
            <img
              src={m.author.photo}
              alt={m.author.name}
              className={styles.profilePhoto}
            />
          </div>
          <div className={styles.content}>
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <strong className={styles.author}>{m.author.name}</strong>{' '}
              <span className={styles.mentionAction}> {wpType[m.wmProperty]}</span>
            </a>
            <div className={styles.mentionText}>
              {m.content?.text ? (
                m.content.text
              ) : (
                <a
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.url}
                >
                  {m.url.replace(/https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Webmentions
