import React, { useEffect } from 'react'

interface PropTypes {
  secondsRemaining: number
  handleSetTimer: () => void
}

export default function Timer(props: PropTypes) {
  const { secondsRemaining, handleSetTimer } = props

  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`

  // Set Timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleSetTimer()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [handleSetTimer])

  return <div className='timer'>{formattedTime}</div>
}
