import React, { Component } from 'react'

import '../styles/app.css'

import Map from './Map'
import ZoomControls from './ZoomControls'
import Filters from './Filters'
import Drawer from './Drawer'
import Button from './Button'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      level: 'GM',
    }
  }

  onSearch = (filters) => {
    console.log('Search query - ' + filters.query)
    console.log('Search range - from ' + filters.rangeMin + ' to ' + filters.rangeMax)
    console.log('Search types - ' + filters.types)
    this.setState({filters: false})
  }

  setZoomLevel(level) {
    this.setState({level})
  }

  render() {
    return (
      <div className="c-app">
        <Map level={this.state.level} />
        <ZoomControls setZoomLevel={this.setZoomLevel.bind(this)} />
        <Filters onSearch={this.onSearch} />
        <div className='c-alerts'>
          <Button shadow={true} text='Sign up for alerts' icon='mail' textAlign='left'/>
        </div>
        <Drawer numberDoc={10} />
      </div>
    )
  }
}

export default App
