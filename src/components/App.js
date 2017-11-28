import React, { Component } from 'react'

import '../styles/app.css'
import logo from '../images/logo.svg'

import Map from './Map'

class App extends Component {
  render() {
    return (
      <div className="c-app">
        <header className="c-app c-app--header">
          <img src={logo} className="c-app--logo" alt="logo" />
          <h1 className="c-app--title">Welcome to React</h1>
        </header>
        <Map />
      </div>
    )
  }
}

export default App
