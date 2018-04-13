import React from 'react'


export default props => {
  return (
    <div>
      <h3>List of childs</h3>
      { props.children }
    </div>
  )
}