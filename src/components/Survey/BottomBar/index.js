import React from 'react'

import styles from './BottomBar.module.css'

const BottomBar = ({ handleSubmit, handleReset, isSubmitActive, isCancelActive }) => (
  <div className={styles.bottomBar}>
    <button
      disabled={!isCancelActive}
      onClick={handleReset}
      className={styles.resetButton}
    >
      Reset
    </button>
    <button
      disabled={!isSubmitActive}
      onClick={handleSubmit}
      className={styles.submitButton}
    >
      Spend coins
    </button>
  </div>
)

export default BottomBar
