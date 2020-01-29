import React from 'react'

import styles from './Coin.module.css'
import coin from './coin.png'

const Coin = () => <img src={coin} className={styles.coin} alt="Reach coin" />

export default Coin
