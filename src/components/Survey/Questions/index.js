import React from 'react'

import BottomBar from '../BottomBar'
import Coin from '../Coin'
import styles from '../Survey.module.css'
import Topic from '../Topic'

const FakeCoin = () => <div className={styles.fakeCoin}></div>

const CoinHolder = ({ remainingCoins, totalCoins }) => {
  return (
    <div className={styles.coinHolder}>
      {[
        ...Array.from(Array(remainingCoins)).map((_v, i) => <Coin key={`r-${i}`} />),
        ...Array.from(Array(totalCoins - remainingCoins)).map((_v, i) => (
          <FakeCoin key={`p-${i}`} />
        ))
      ]}
    </div>
  )
}

const Questions = ({
  remainingCoins,
  totalCoins,
  topics,
  handleReset,
  handleSubmit,
  handleTopicClick
}) => (
  <>
    <div className={styles.content}>
      <CoinHolder remainingCoins={remainingCoins} totalCoins={totalCoins} />
      <h1 className={styles.title}>
        How much would you be interested in following topics for our next meeting?
      </h1>
      {Object.values(topics).map(t => (
        <Topic {...t} handleClick={() => handleTopicClick(t.key)} />
      ))}
    </div>
    <BottomBar
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      isCancelActive={remainingCoins < totalCoins}
      isSubmitActive={remainingCoins === 0}
    />
  </>
)

export default Questions
