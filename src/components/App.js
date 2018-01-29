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
import FiltersService from '../services/FiltersService'

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
      query: '',
      facets: {},
      documentsCount: 0,
      documents: [],
      filters: {},
      page: 1,
      hasMoreDocs: true,
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

  sliceFilters() {
    let filtersSliced = this.state.filters['classification']
    return filtersSliced
  }

  async handleOnSubmitSearch(query, filters) {
    let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(this.state.code, query);
    this.setState({query, facets, documentsCount, documents, filters})
  }

  async selectArea(code, name) {
    if ( !code ) {
      FiltersService.reset();
      this.setState({code, municipalities: this.allMunicipalities, filters: {}})
    } else {
      let geo = await this.MapService.getFeatures(code)
      let adjacent = await this.MapService.getAdjacentFeatures(code)
      let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(code);
      this.setState({code, geo, adjacent, name, facets, documentsCount, documents})
    }
  }

  async getMoreDocuments(page) {
    const filters = Object.assign({}, this.state.filters);
    FiltersService.set(filters);
    let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(this.state.code, this.state.query, page);
    const hasMoreDocs = Math.ceil(documentsCount/2) >= page;
    this.setState({facets, documentsCount, documents: [...this.state.documents.concat(documents)], page, hasMoreDocs})
  }

  async selectMunicipality(code, name) {
    let geo = await this.MapService.getFeatures(code)
    let adjacent = await this.MapService.getAdjacentFeatures(code)
    let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(code);
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

  resetQuery() {
    this.setState({query: ''})
    this.handleOnSubmitSearch('', this.state.filters)
  }

  updateFilters(key, filterName) {
    const filters = Object.assign({}, this.state.filters)
    const query = this.state.query
    filters[filterName].terms = this.state.filters[filterName].terms.filter(tag => tag !== key)
    if(!filters[filterName].terms.length) {
      delete filters[filterName]
    }
    FiltersService.set(filters)
    this.setState({filters})
    this.handleOnSubmitSearch(query, filters)
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
          filters={this.state.filters}
          updateFilters={this.updateFilters.bind(this)}
          query={this.state.query}
          resetQuery={this.resetQuery.bind(this)}
          getMoreDocuments={this.getMoreDocuments.bind(this)}
          hasMoreDocs={this.state.hasMoreDocs}
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
          filters={this.sliceFilters()}
          updateFilters={this.updateFilters.bind(this)}
          query={this.state.query}
          resetQuery={this.resetQuery.bind(this)}
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
          counts={this.MapService.getAreaCounts(
              this.state.facets,
              this.state.code,
              this.state.documentsCount
          )}
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
