import React from 'react'

import styles from './Header.module.css'
import logo from './logo.svg'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="/" className="h-card" rel="me">
          <img className={styles.logo} src={logo} width="150" alt="wunnle logo" />
        </a>
        <nav className={styles.nav}>
          <a href="https://wunnle.dev/">Portfolio</a>
          <a
            className={[styles.contactLink, u - email].join(' ')}
            href="mailto:me@wunnle.com"
            target="_blank"
            rel="noopener noreferrer me"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header
