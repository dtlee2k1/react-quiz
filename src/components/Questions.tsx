import React from 'react'
import { Question } from '../types/question.type'
import Options from './Options'

interface PropTypes {
  question: Question
  answer: number | null
  handleSelectOptions: (index: number) => void
}

export default function Questions(props: PropTypes) {
  const { question, answer, handleSelectOptions } = props
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} handleSelectOptions={handleSelectOptions} />
    </div>
  )
}
