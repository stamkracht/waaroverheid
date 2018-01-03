import React from 'react'

import Map from './Map'
import ZoomControls from './ZoomControls'
import Alert from './Alert'
import Filters from './Filters'
import Drawer from './Drawer'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      level: 'GM',
      code: '',
    }
  }

  onSearch = (filters) => {
    console.log('Search query - ' + filters.query)
    console.log('Search range - from ' + filters.rangeMin + ' to ' + filters.rangeMax)
    console.log('Search types - ' + filters.types)
    this.setState({filters: false})
  }

  setZoomLevel = (level, code) => {
    this.setState({level, code})
  }

  render() {
    return (
      <div className='c-app'>
        <Map level={this.state.level}
          code={this.state.code}
          setZoomLevel={this.setZoomLevel} />
        <ZoomControls setZoomLevel={this.setZoomLevel} />
        <Filters onSearch={this.onSearch} />
        <Alert />
        <Drawer numberDoc={10} />
      </div>
    )
  }
}

export default App
