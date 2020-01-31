import React from 'react'

import Coin from '../Coin'
import styles from './Topic.module.css'

const Topic = ({ content, rating, handleClick }) => (
  <div className={styles.topic} onClick={handleClick}>
    <div className={styles.text}>{content}</div>
    <div className={styles.coinHolder}>
      {Array.from(Array(rating)).map((v, i) => (
        <Coin key={i} />
      ))}
    </div>
  </div>
)

export default Topic
