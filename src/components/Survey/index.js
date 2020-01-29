import React from 'react'
import { useReducer } from 'react'

import Coin from './Coin'
import styles from './Survey.module.css'
import Topic from './Topic'

const CoinHolder = ({ count }) => {
  return <div className={styles.coinHolder}>{new Array(count).fill(<Coin />)}</div>
}

const initialState = {
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <CoinHolder count={state.remainingCoins} />
          {Object.values(state.topics).map(t => (
            <Topic {...t} handleClick={() => dispatch(upvoteAction(t.key))} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Survey
