import React from 'react'

interface PropTypes {
  children: React.ReactNode
}

export default function Footer(props: PropTypes) {
  const { children } = props
  return <footer>{children}</footer>
}
