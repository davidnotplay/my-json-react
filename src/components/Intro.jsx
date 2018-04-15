import React from 'react'
import { AnchorButton } from '@blueprintjs/core'
import reactLogo from '../img/react-icon.svg'
import githubImage from '../img/github-logo.svg'

import { GITHUB_PAGE } from '../utils/constants'

class Intro extends React.Component {
  render() {
    const githubIcon = <img src={ githubImage }/>
    return (
      <div className="intro-wrapper">
        <img src={ reactLogo } className="logo"/>
        <h1>My JSON React</h1>
        <AnchorButton
          text="Github"
          href={ GITHUB_PAGE }
          icon={ githubIcon }
          target="_BLANK"
          className="pt-large github-link pt-minimal"
        />
        <p className="description">
          Transfor plain javascript objects or json strings in React components easily.
          More info&nbsp;
          <a href={ GITHUB_PAGE } target="_BLANK">here</a>
        </p>
      </div>
    )
  }
}

export default Intro