import React from 'react'
import { useReducer } from 'react'

import BottomBar from './BottomBar'
import Coin from './Coin'
import LightLogo from './lightLogo.inline.svg'
import styles from './Survey.module.css'
import Topic from './Topic'

const FakeCoin = () => <div className={styles.fakeCoin}></div>

const CoinHolder = ({ remainingCoins, totalCoins }) => {
  return (
    <div className={styles.coinHolder}>
      {[
        ...Array(remainingCoins).fill(<Coin />),
        ...Array(totalCoins - remainingCoins).fill(<FakeCoin />)
      ]}
    </div>
  )
}

const initialState = {
  totalCoins: 5,
  remainingCoins: 5,
  topics: {
    1: {
      content: 'Creating first react app',
      rating: 0,
      key: 1
    },
    2: {
      content: 'Functional components',
      rating: 0,
      key: 2
    },
    3: {
      content: 'Redux',
      rating: 0,
      key: 3
    },
    4: {
      content: 'Custom hooks',
      rating: 0,
      key: 4
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPVOTE': {
      const topic = state.topics[action.payload.topicKey]

      return {
        ...state,
        remainingCoins: state.remainingCoins - 1,
        topics: {
          ...state.topics,
          [action.payload.topicKey]: {
            ...topic,
            rating: topic.rating + 1
          }
        }
      }
    }

    case 'RESET': {
      return initialState
    }

    default:
      throw new Error()
  }
}

function upvoteAction(topicKey) {
  return {
    type: 'UPVOTE',
    payload: {
      topicKey
    }
  }
}

const Survey = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { totalCoins, remainingCoins, topics } = state

  function handleTopicClick(key) {
    if (state.remainingCoins) {
      dispatch(upvoteAction(key))
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <LightLogo />
        </header>
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
          handleReset={() => dispatch({ type: 'RESET' })}
          isCancelActive={remainingCoins < totalCoins}
          isSubmitActive={remainingCoins === 0}
        />
      </div>
    </div>
  )
}

export default Survey
