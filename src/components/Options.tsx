import React from 'react'
import { Question } from '../types/question.type'

interface PropTypes {
  question: Question
  answer: number | null
  handleSelectOptions: (index: number) => void
}

export default function Options(props: PropTypes) {
  const { question, answer, handleSelectOptions } = props
  const hasAnswered = answer !== null

  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered ? (question.correctOption === index ? 'correct' : 'wrong') : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => handleSelectOptions(index)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
