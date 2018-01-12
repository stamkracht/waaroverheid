import React from 'react'
import levenshtein from 'js-levenshtein'

import Map from './Map'
import MapService from '../services/MapService'
import ZoomControls from './ZoomControls'
import Municipalities from './Municipalities'
import Alert from './Alert'
import Filters from './Filters'
import Drawer from './Drawer'
import DocumentService from '../services/DocumentService'

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loadingLocation: false,
      drawerActive: false,
      municipalities: [],
      code: '',
      geo: {},
      adjacent: {},
    }

    this.MapService = new MapService()
    this.allMunicipalities = []

    this.DocumentService = new DocumentService()

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  componentDidMount() {
    this.MapService.getMunicipalities().then((municipalities) => {
      this.allMunicipalities = municipalities.sort(function(a, b){
        if ( a.name < b.name ) { return -1 }
        if ( a.name > b.name ) { return 1 }
        return 0
      })
      this.setState({municipalities: this.allMunicipalities})
    })
  }

  async showUserLocation() {
    await this.setState({loadingLocation: true})
    let code = await this.MapService.getUserLocation()
    let geo = await this.MapService.getFeatures(code)
    let adjacent = await this.MapService.getAdjacentFeatures(code)
    this.setState({loadingLocation: false, geo, adjacent, code})
  }

  handleKeyDown(event) {
    if ( event.keyCode === 27 && this.state.drawerActive ) {
      this.setState({drawerActive: false})
    }
  }

  toggleDrawer() {
    this.setState({
      drawerActive: !this.state.drawerActive,
    })
  }

  handleOnSubmitFilters() {
    console.log(this.DocumentService.filters)
  }

  async selectArea(code) {
    if ( !code ) {
      this.setState({code, municipalities: this.allMunicipalities})
    } else {
      let geo = await this.MapService.getFeatures(code)
      let adjacent = await this.MapService.getAdjacentFeatures(code)
      this.setState({code, geo, adjacent})
    }
  }

  async selectMunicipality(code) {
    let geo = await this.MapService.getFeatures(code)
    let adjacent = await this.MapService.getAdjacentFeatures(code)
    this.setState({code, geo, adjacent})
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
          loading={this.state.loadingLocation}
          list={this.state.municipalities}
          filter={this.filterMunicipalities.bind(this)}
          select={this.selectMunicipality.bind(this)}
          showLocation={this.showUserLocation.bind(this)} />
      )
    }
  }

  renderControls() {
    if ( this.state.code && !this.state.drawerActive ) {
      return (
        <ZoomControls
          code={this.state.code}
          setZoomLevel={this.selectArea.bind(this)} />
      )
    }
  }

  renderFilters() {
    if ( this.state.code && !this.state.drawerActive ) {
      return (
        <div>
          <Filters
            service={this.DocumentService}
            submit={this.handleOnSubmitFilters.bind(this)} />
          <Alert />
        </div>
      )
    }
  }

  renderDocuments() {
    if ( this.state.code ) {
      return (
        <Drawer
          numberDoc={10}
          area={this.state.code}
          active={this.state.drawerActive}
          toggle={this.toggleDrawer.bind(this) }/>
      )
    }
  }

  render() {
    return (
      <div className='c-app'>
        <Map
          geo={this.state.geo}
          adjacent={this.state.adjacent}
          code={this.state.code}
          select={this.selectArea.bind(this)}
          openDrawer={this.toggleDrawer.bind(this)} />
        {this.renderMunicipalities()}
        {this.renderControls()}
        {this.renderFilters()}
        {this.renderDocuments()}
      </div>
    )
  }
}

export default App
