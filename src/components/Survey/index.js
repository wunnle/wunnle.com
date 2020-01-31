import React, { useState } from 'react'
import { useReducer } from 'react'

import LightLogo from './lightLogo.inline.svg'
import Questions from './Questions'
import Results from './Results'
import styles from './Survey.module.css'

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
  const [isShowingResults, setShowingResults] = useState()
  const [state, dispatch] = useReducer(reducer, initialState)

  function handleTopicClick(key) {
    if (state.remainingCoins) {
      dispatch(upvoteAction(key))
    }
  }

  console.log({ Questions })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <LightLogo />
        </header>
        {isShowingResults ? (
          <Results {...state} />
        ) : (
          <Questions
            {...state}
            handleReset={() => dispatch({ type: 'RESET' })}
            handleSubmit={() => setShowingResults(true)}
            handleTopicClick={handleTopicClick}
          />
        )}
      </div>
    </div>
  )
}

export default Survey
