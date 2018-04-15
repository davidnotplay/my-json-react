import React from 'react'


export default props => {
  return (
    <div>
      <h3>Hello world!!!</h3>
      <p>
        <b>{ props.name }</b> is awesome!!!
        Go this <a href={ props.link } target="_BLANK">link</a> for more info.
      </p>
    </div>
  )
}