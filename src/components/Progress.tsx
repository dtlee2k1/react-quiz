import React from 'react'

interface PropTypes {
  index: number
  points: number
  answer: number | null
  numQuestions: number
  maxPossiblePoints: number
}

export default function Progress(props: PropTypes) {
  const { index, points, answer, numQuestions, maxPossiblePoints } = props

  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  )
}
