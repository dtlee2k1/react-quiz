import React from 'react'

interface PropTypes {
  handleNextQuestion: () => void
}

export default function NextButton(props: PropTypes) {
  const { handleNextQuestion } = props
  return (
    <button className='btn btn-ui' onClick={handleNextQuestion}>
      Next
    </button>
  )
}
