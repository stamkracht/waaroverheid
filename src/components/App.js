import React, { Component } from 'react'

import '../styles/app.css'
import logo from '../images/logo.svg'

import Map from './Map'

class App extends Component {
  render() {
    return (
      <div className="c-app">
        <Map />
      </div>
    )
  }
}

export default App
