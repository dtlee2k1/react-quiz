import React from 'react'

interface PropTypes {
  points: number
  highscore: number
  maxPossiblePoints: number
  handleRestart: () => void
}

export default function FinishScreen(props: PropTypes) {
  const { points, highscore, maxPossiblePoints, handleRestart } = props

  const percentage = Math.ceil((points / maxPossiblePoints) * 100)
  let emoji
  if (percentage === 100) emoji = '🥇'
  if (percentage >= 80 && percentage < 100) emoji = '🎉'
  if (percentage >= 50 && percentage < 80) emoji = '🙃'
  if (percentage >= 0 && percentage < 50) emoji = '🤨'
  if (percentage === 0) emoji = '🤦‍♂️'
  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {percentage}%)
      </p>
      <p className='highscore'>(High score: {highscore} points)</p>
      <button className='btn btn-ui' onClick={handleRestart}>
        Restart Quiz
      </button>
    </>
  )
}
