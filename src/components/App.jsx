import React from 'react'

import JsonReactZone from './JsonReactZone'
import Intro from './Intro'

class App extends React.Component {
  render() {
    return (
      <div>
        <Intro/>
        <JsonReactZone/>
      </div>
    )
  }
}

export default App