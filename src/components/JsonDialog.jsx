import React from 'react'
import { Dialog } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import ReactJson from 'react-json-view'

class JsonDialog extends React.Component {
  render() {
    const { filename, isOpen, onClose, src, onChange } = this.props

    return (
      <Dialog
        className="json-dialog"
        isOpen={ isOpen }
        title={ `File ${filename}.json` }
        onClose={ onClose }
        icon={ IconNames.EDIT }
      >
        <div className="pt-dialog-body">
          <ReactJson src={ src } onEdit={ onChange } onAdd= { onChange }/>
        </div>
      </Dialog>
    )
  }
}

export default JsonDialog