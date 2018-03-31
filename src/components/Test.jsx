import React from 'react'

class Test extends React.Component {
  render() {
    const { name, number, children } = this.props

    return <div>
      <div>Test component { name }, number is { number }</div>
      <div>{ children }</div>
    </div>
  }
}

export default Test