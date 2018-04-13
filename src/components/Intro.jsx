import React from 'react'
import { AnchorButton } from '@blueprintjs/core'
import reactLogo from '../img/react-icon.svg'
import githubImage from '../img/github-logo.svg'

class Intro extends React.Component {
  render() {
    const githubIcon = <img src={ githubImage }/>
    return (
      <div className="intro-wrapper">
        <img src={ reactLogo } className="logo"/>
        <h1>My React JSON</h1>
        <AnchorButton
          text="Github"
          href="#"
          icon={ githubIcon }
          className="pt-large github-link pt-minimal"
        />
        <p className="description">
          Transfor plain javascript objects or json strings in React components easily.
          More info&nbsp;
          <a href="#">here</a>
        </p>
      </div>
    )
  }
}

export default Intro