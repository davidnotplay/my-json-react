import React from 'react'
import { configure } from 'enzyme'

const versionNumber =  React.version.split('.')
let adapter = null

if (versionNumber[0] == '16') {
  adapter = new (require('enzyme-adapter-react-16'))
} else {
  adapter = new (require('enzyme-adapter-react-15'))
}

configure({ adapter })
