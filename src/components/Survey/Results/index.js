import React from 'react'

import Coin from '../Coin'
import styles from './Results.module.css'

const Results = ({ topics }) => (
  <div className={styles.content}>
    <h1 className={styles.title}>Thanks for your input</h1>
    <h2 className={styles.subtitle}>Here are the results so far:</h2>

    {Object.values(topics)
      .sort((a, b) => b.rating - a.rating)
      .map((t, i) => (
        <Result {...t} index={i} />
      ))}
  </div>
)

const Result = ({ content, rating, index }) => (
  <div className={styles.result}>
    <div className={styles.topicName}>
      {index}. {content}
    </div>
    <div className={styles.topicRate}>
      {rating} <Coin />
    </div>
  </div>
)

export default Results
