import React from 'react'


export default function(props) {
  const { className, children } = props
  return <ul className={ className }>{ children }</ul>
}