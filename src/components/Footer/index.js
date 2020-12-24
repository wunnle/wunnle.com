import React from 'react'

import dribbbleLogo from './dribble.svg'
import styles from './Footer.module.css'
import githubLogo from './github.svg'
import logomark from './logomark.svg'
import twitterLogo from './twitter.svg'

const Footer = props => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <a href="/" className={styles.logoLink}>
        <img src={logomark} width="70px" alt="wunnle logo" />
      </a>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer me"
              href="https://twitter.com/wunnle"
            >
              <img src={twitterLogo} alt="wunnle on twitter" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer me"
              href="https://dribbble.com/wunnle"
            >
              <img src={dribbbleLogo} alt="wunnle on dribbble" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer me"
              href="https://github.com/wunnle"
            >
              <img src={githubLogo} alt="wunnle on github" />
            </a>
          </li>
        </ul>
      </nav>
      <link
        rel="webmention"
        href="https://webmention.io/wunnle.com/webmention"
        style={{ display: 'none' }}
      />
      <link
        rel="pingback"
        href="https://webmention.io/wunnle.com/xmlrpc"
        style={{ display: 'none' }}
      />
    </div>
  </footer>
)

export default Footer
