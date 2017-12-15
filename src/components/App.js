import React, { Component } from 'react'

import '../styles/app.css'
import logo from '../images/logo.svg'
import Filters from './Filters'
import Drawer from './Drawer'

class App extends Component {

  onSearch = (filters) => {
    console.log('Search query - ' + filters.query)
    console.log('Search range - from ' + filters.rangeMin + ' to ' + filters.rangeMax)
    console.log('Search types - ' + filters.types)
    this.setState({filters: false})
  }

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
        <Filters onSearch={this.onSearch} />
        <Drawer />
      </div>
    )
  }
}

export default App
