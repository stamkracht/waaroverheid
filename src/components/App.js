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
import SearchService from '../services/SearchService'

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
      name: '',
      facets: {},
      documentsCount: 0,
      documents: [],
      filters: {},
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
    let code_name = await this.MapService.getUserLocation()
    let code = code_name[0]
    let name = code_name[1]
    let geo = await this.MapService.getFeatures(code)
    let adjacent = await this.MapService.getAdjacentFeatures(code)
    this.setState({loadingLocation: false, geo, adjacent, code, name})
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

  async handleOnSubmitSearch(query, filters) {
    let {facets, meta: {total: documentsCount}=0, events: documents} = await SearchService.search(this.state.code, query);
    this.setState({facets, documentsCount, documents, filters});
  }

  async selectArea(code, name) {
    if ( !code ) {
      this.setState({code, municipalities: this.allMunicipalities})
    } else {
      let geo = await this.MapService.getFeatures(code)
      let adjacent = await this.MapService.getAdjacentFeatures(code)
      let {facets, meta: {total: documentsCount}=0, events: documents} = await SearchService.search(code);
      this.setState({code, geo, adjacent, name, facets, documentsCount, documents})
    }
  }

  async selectMunicipality(code, name) {
    let geo = await this.MapService.getFeatures(code)
    let adjacent = await this.MapService.getAdjacentFeatures(code)
    let {facets, meta: {total: documentsCount}=0, events: documents} = await SearchService.search(code);
    this.setState({code, geo, adjacent, name, facets, documentsCount, documents})
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
    if ( this.state.code && !this.state.drawerActive && this.state.documentsCount) {
      return (
        <div>
          <Filters
            facets={this.state.facets}
            submit={this.handleOnSubmitSearch.bind(this)} />
        </div>
      )
    }
  }

  renderDocuments() {
    if ( this.state.code ) {
      return (
        <Drawer
          numberDoc={this.state.documentsCount}
          area={this.state.name}
          active={this.state.drawerActive}
          toggle={this.toggleDrawer.bind(this)}
          service={this.DocumentService}
          facets={this.state.facets}
          documents={this.state.documents}
          appliedFilters={this.state.filters}
          />
      )
    }
  }

  renderAlert() {
    if ( this.state.code ) {
      return (
        <Alert
          service={this.DocumentService}
          area={this.state.name}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <Map
          geo={this.state.geo}
          adjacent={this.state.adjacent}
          code={this.state.code}
          select={this.selectArea.bind(this)}
          openDrawer={this.toggleDrawer.bind(this)} />
        {this.renderMunicipalities()}
        {this.renderControls()}
        {this.renderFilters()}
        {this.renderAlert()}
        {this.renderDocuments()}
      </div>
    )
  }
}

export default App
