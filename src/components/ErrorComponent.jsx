import React from 'react'
import { NonIdealState } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

class ErrorComponent extends React.Component {
  render() {
    const { exception } = this.props
    return (
      <NonIdealState
        className="error-component"
        title="Error rendering json file"
        description={ exception.message }
        visual={ IconNames.ERROR }/>
    )
  }
}

export default ErrorComponent