import React, { Component } from 'react'

import '../styles/App.css'
import logo from '../images/logo.svg'

class App extends Component {
  render() {
    return (
      <div className="c-app">
        <header className="c-app c-app--header">
          <img src={logo} className="c-app--logo" alt="logo" />
          <h1 className="c-app--title">Welcome to React</h1>
        </header>
        <p className="c-app--intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App