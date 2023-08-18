import { useReducer, useState } from 'react'

enum ActionKind {
  DEC = 'DEC',
  INC = 'INC',
  SETCOUNT = 'SETCOUNT',
  SETSTEP = 'SETSTEP',
  RESET = 'RESET'
}

type ActionType = {
  type: ActionKind
  payload?: number
}

interface StateType {
  count: number
  step: number
}

const initialState: StateType = {
  count: 0,
  step: 1
}

const reducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action
  switch (type) {
    case ActionKind.DEC: {
      return { ...state, count: state.count - state.step }
    }
    case ActionKind.INC: {
      return { ...state, count: state.count + state.step }
    }
    case ActionKind.SETCOUNT: {
      if (payload !== undefined) {
        return { ...state, count: payload }
      } else {
        throw new Error('Payload is required for SETCOUNT action.')
      }
    }

    case ActionKind.SETSTEP: {
      if (payload !== undefined) {
        return { ...state, step: payload }
      } else {
        throw new Error('Payload is required for SETCOUNT action.')
      }
    }

    case ActionKind.RESET: {
      return initialState
    }

    default:
      throw new Error('error')
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { count, step } = state

  // This mutates the date object.
  const date = new Date()
  date.setDate(date.getDate() + count)

  const dec = function () {
    dispatch({ type: ActionKind.DEC })
  }

  const inc = function () {
    dispatch({ type: ActionKind.INC })
  }

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionKind.SETCOUNT, payload: Number(e.target.value) })
  }

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionKind.SETSTEP, payload: Number(e.target.value) })
  }

  const reset = function () {
    dispatch({ type: ActionKind.RESET })
  }

  return (
    <div className='counter'>
      <div>
        <input type='range' min='0' max='10' value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
export default DateCounter
