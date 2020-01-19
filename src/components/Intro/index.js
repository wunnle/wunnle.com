import React from 'react'

import styles from './Intro.module.css'

const Intro = () => (
  <div className={styles.intro}>
    <p className={styles.greeting}>Hi, I’m Sinan,</p>
    <h1 className={styles.description}>
      This is a blog about front-end development, <br /> UI design and maybe some short
      stories.
    </h1>
  </div>
)

export default Intro
