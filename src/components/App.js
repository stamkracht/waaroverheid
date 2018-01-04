import React from 'react'

import Map from './Map'
import MapService from '../services/MapService'
import ZoomControls from './ZoomControls'
import Alert from './Alert'
import Filters from './Filters'
import Drawer from './Drawer'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      level: 'GM',
      code: 'GM0344',
      geo: {},
    }

    this.MapService = new MapService()
  }

  componentDidMount() {
    this.MapService.getFeatures(this.state.level, this.state.code).then((geo) => {
      this.setState({geo})
    })
  }

  onSearch = (filters) => {
    console.log('Search query - ' + filters.query)
    console.log('Search range - from ' + filters.rangeMin + ' to ' + filters.rangeMax)
    console.log('Search types - ' + filters.types)
    this.setState({filters: false})
  }

  setZoomLevel = (level, code) => {
    if ( !code && level === 'GM' ) {
      code = `GM${this.state.code.match(/[0-9]{4}/g)[0]}`
    } else if ( !code && level === 'WK' ) {
      code = `WK${this.state.code.match(/[0-9]{6}/g)[0]}`
    } else if ( !code && level === 'BU' ) {
      code = `BU${this.state.code.match(/[0-9]{8}/g)[0]}`
    }
    this.MapService.getFeatures(level, code).then((geo) => {
      this.setState({geo, level, code})
    })
  }

  render() {
    return (
      <div className='c-app'>
        <Map geo={this.state.geo}
          level={this.state.level}
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
