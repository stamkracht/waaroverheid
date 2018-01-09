import React from 'react'
import levenshtein from 'js-levenshtein'

import Map from './Map'
import MapService from '../services/MapService'
import ZoomControls from './ZoomControls'
import Municipalities from './Municipalities'
import Alert from './Alert'
import Filters from './Filters'
import Drawer from './Drawer'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      municipalities: [],
      code: '',
      geo: {},
    }

    this.MapService = new MapService()
    this.allMunicipalities = []
  }

  componentDidMount() {
    this.MapService.getMunicipalities().then((municipalities) => {
      this.allMunicipalities = municipalities
      this.setState({municipalities})
    })
  }

  onSearch = (filters) => {
    console.log('Search query - ' + filters.query)
    console.log('Search range - from ' + filters.rangeMin + ' to ' + filters.rangeMax)
    console.log('Search types - ' + filters.types)
    this.setState({filters: false})
  }

  selectArea(code) {
    if ( !code ) {
      this.setState({code, municpalities: this.allMunicipalities})
    } else {
      this.MapService.getFeatures(code).then((geo) => {
        this.setState({geo, code})
      })
    }
  }

  selectMunicipality(code) {
    this.MapService.getFeatures(code).then((geo) => {
      this.setState({geo, code})
    })
  }

  filterMunicipalities(q) {
    let municipalities = this.allMunicipalities.filter(item => {
      let name = item.name.toLowerCase()
      return name.indexOf(q) >= 0 || levenshtein(name, q) <= 2
    }).sort(function(a, b){
      if ( a.name < b.name ) { return -1 }
      if ( a.name > b.name ) { return 1 }
      return 0
    })
    this.setState({municipalities})
  }

  renderMunicipalities() {
    if ( !this.state.code ) {
      return (
        <Municipalities
          list={this.state.municipalities}
          select={this.selectMunicipality.bind(this)}
          filter={this.filterMunicipalities.bind(this)}>
        </Municipalities>
      )
    }
  }

  renderControls() {
    if ( this.state.code ) {
      return (
        <ZoomControls
          code={this.state.code}
          setZoomLevel={this.selectArea.bind(this)} />
      )
    }
  }

  renderDocuments() {
    if ( this.state.code ) {
      return (
        <div>
          <Filters onSearch={this.onSearch} />
          <Alert />
          <Drawer numberDoc={10} />
        </div>
      )
    }
  }

  render() {
    return (
      <div className='c-app'>
        <Map geo={this.state.geo}
          code={this.state.code}
          select={this.selectArea.bind(this)} />
        {this.renderMunicipalities()}
        {this.renderControls()}
        {this.renderDocuments()}
      </div>
    )
  }
}

export default App
