import React from 'react'
import { Card, Button } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import start from '../jsonReact'
import Selector from './Selector'
import JsonDialog from './JsonDialog'
import ErrorComponent from './ErrorComponent'

// example components
import HelloWorld from './examples/HelloWold'
import Children from './examples/Children'
import Text from './examples/Text'
import Number from './examples/Number'
import List from './examples/List'
import Item from './examples/Item'
import Link from './examples/Link'

const allComponents = {
  HelloWorld, Children, Text, Number, List, Item, Link
}

class JsonReactZone extends React.Component {
  constructor(props) {
    super(props)
    this.state = { jsonData: null, jsonName: '', jsonDialogOpen: false }

    this.onSelectJson = this.onSelectJson.bind(this)
    this.onChangeJson = this.onChangeJson.bind(this)
  }

  onSelectJson(jsonName, jsonData) {
    this.setState({ jsonName, jsonData })
  }

  showDialog(show) {
    this.setState({ jsonDialogOpen: show })
  }

  onChangeJson(jsonData) {
    this.setState({ jsonData: jsonData.updated_src })
  }

  renderJson() {
    const options = { errorComponent: ErrorComponent }
    const componentRendered = start(this.state.jsonData, allComponents, options)

    return (
      <Card className="react-json-container">
        <h5> File "{ this.state.jsonName }.json" rendered</h5>

        <Button
          icon={ IconNames.EDIT }
          className="pt-minimal edit-json-button"
          onClick={ () => this.showDialog(true) }
        >
          Edit json file
        </Button>
        <p className="render-zone">
          { componentRendered }
        </p>
      </Card>
    )
  }

  render() {
    return (
      <div className="json-react-zone">
        <h2>My React JSON examples</h2>
        <br/>
        <Selector onSelect={ this.onSelectJson }/>
        <JsonDialog
          onChange={ this.onChangeJson }
          src={ this.state.jsonData || {} }
          filename={ this.state.jsonName }
          isOpen={ this.state.jsonDialogOpen }
          onClose={ () => this.setState({ jsonDialogOpen: false }) }
        />
        { this.renderJson() }
      </div>
    )
  }
}

export default JsonReactZone