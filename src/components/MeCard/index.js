import React from 'react'

import styles from './MeCard.module.css'
import img from './profilepic.jpg'

const MeCard = ({ date }) => (
  <div className={styles.meCard}>
    <div className={styles.figure}>
      <img src={img} className="u-photo" alt="Sinan Aksay smiling with cool shades" />
    </div>
    <div className={styles.info}>
      <p className={styles.name}>Sinan Aksay</p>
      <p className={styles.date}>on {date}</p>
    </div>
  </div>
)

export default MeCard
