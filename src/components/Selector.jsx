import React from 'react'

// json files.
import helloWorldJson from '../json/helloWorld.js'
import children from '../json/children.json'
import performance from '../json/performance'

const INITIAL_JSON = 'helloWorldJson'

const jsonFiles = {
  helloWorldJson: {
    name: 'Hello world',
    jsonFile: helloWorldJson
  },
  children: {
    name: 'Children',
    jsonFile: children
  },
  performance: {
    name: 'List with links',
    jsonFile: performance
  }
}

class Selector extends React.Component {
  makeJsonOptions() {
    return Object.keys(jsonFiles).map((key, i) => {
      const { name } = jsonFiles[key]
      const selected = i == 0
      return <option value={ key } key={ i + 1 } selected={ selected }>{ name }</option>
    })
  }

  componentWillMount() {
    /**
     * add an initial json file.
     */
    const { name, jsonFile } = jsonFiles[INITIAL_JSON]
    this.props.onSelect(name, jsonFile)
  }

  onChange(e) {
    const value = e.currentTarget.value
    const { name, jsonFile } = jsonFiles[value]
    this.props.onSelect(name, jsonFile)
  }

  render() {
    return (
      <label class="pt-label">
        Select a Json file
        <div class="pt-select pt-large">
          <select onChange={e => this.onChange(e)}>
            { this.makeJsonOptions() }
          </select>
        </div>
      </label>
    )
  }
}

export default Selector