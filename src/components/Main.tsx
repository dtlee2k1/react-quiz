import React from 'react'

interface PropTypes {
  children: React.ReactNode
}

export default function Main(props: PropTypes) {
  const { children } = props
  return <div className='main'>{children}</div>
}
