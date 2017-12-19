import React, { Component } from 'react'

import '../styles/app.css'
import Filters from './Filters'
import Drawer from './Drawer'
import Button from './Button'

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
        <Filters onSearch={this.onSearch} />
        <div className='c-alerts'>
          <Button shadow={true} text='Sign up for alerts' icon='mail' textAlign='left'/>
        </div>
        <Drawer numberDoc={10}/>
      </div>
    )
  }
}

export default App
