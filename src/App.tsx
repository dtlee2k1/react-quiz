import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import http from './utils/http'
import { Question } from './types/question.type'
import Loader from './components/Loader'
import StartScreen from './components/StartScreen'
import ErrorMessage from './components/ErrorMessage'
import Questions from './components/Questions'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'
import Footer from './components/Footer'
import Timer from './components/Timer'

interface AppState {
  questions: Question[]
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
  index: number
  answer: number | null
  points: number
  highscore: number
  secondsRemaining: number | null
}

type AppAction =
  | { type: 'dataReceived'; payload: Question[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number | null }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' }
  | { type: 'tick' }

const initialState: AppState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  // questions[index]
  index: 0,
  // question.options[answer]
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}

const SECS_PER_QUESTION = 30

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      }
    case 'newAnswer':
      const curQuestion = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === curQuestion?.correctOption
            ? state.points + curQuestion.points
            : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore: state.points > state.highscore ? state.points : state.highscore
      }

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore
      }

    case 'tick':
      return { ...state, secondsRemaining: Number(state.secondsRemaining) - 1 }

    default:
      throw new Error('unknown action')
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0)

  // Fetch API
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await http.get('questions')
        dispatch({ type: 'dataReceived', payload: data.data })
      } catch (error) {
        dispatch({ type: 'dataFailed' })
      }
    }
    fetchData()
  }, [])

  const handleStart = () => {
    dispatch({ type: 'start' })
  }

  const handleSelectOptions = (index: number) => {
    dispatch({ type: 'newAnswer', payload: index })
  }

  const handleNextQuestion = () => {
    if (index === numQuestions - 1) dispatch({ type: 'finish' })
    else dispatch({ type: 'nextQuestion' })
  }

  const handleRestart = () => {
    dispatch({ type: 'restart' })
  }

  const handleSetTimer = () => {
    if (secondsRemaining === 0) dispatch({ type: 'finish' })
    else dispatch({ type: 'tick' })
  }

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} handleStart={handleStart} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              points={points}
              answer={answer}
              numQuestions={numQuestions}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              handleSelectOptions={handleSelectOptions}
            />
            <Footer>
              <Timer secondsRemaining={Number(secondsRemaining)} handleSetTimer={handleSetTimer} />
              {answer !== null && <NextButton handleNextQuestion={handleNextQuestion} />}
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            highscore={highscore}
            maxPossiblePoints={maxPossiblePoints}
            handleRestart={handleRestart}
          />
        )}
      </Main>
    </div>
  )
}

export default App
