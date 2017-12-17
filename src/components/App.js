import React, { Component } from 'react'

import '../styles/app.css'

import Map from './Map'
import Filters from './Filters'
import Drawer from './Drawer'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      level: 15,
    }
  }

  onSearch = (filters) => {
    console.log('Search query - ' + filters.query)
    console.log('Search range - from ' + filters.rangeMin + ' to ' + filters.rangeMax)
    console.log('Search types - ' + filters.types)
    this.setState({filters: false})
  }

  render() {
    return (
      <div className="c-app">
        <Map zoom={this.state.level} />
        <Filters onSearch={this.onSearch} />
        <Drawer />
      </div>
    )
  }
}

export default App
