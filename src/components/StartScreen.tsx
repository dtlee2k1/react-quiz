import React from 'react'

interface PropTypes {
  numQuestions: number
  handleStart: () => void
}

export default function StartScreen(props: PropTypes) {
  const { numQuestions, handleStart } = props
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className='btn btn-ui' onClick={handleStart}>
        Let's start
      </button>
    </div>
  )
}
