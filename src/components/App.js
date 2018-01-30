import React from 'react'
import levenshtein from 'js-levenshtein'

import NavigableMap from './Map'
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
    super(props);

    this.state = {
      loadingLocation: false,
      drawerActive: false,
      municipalities: [],
      code: '',
      geo: {},
      adjacent: {},
      name: '',
      namesByCode: new Map(),
      query: '',
      facets: {},
      documentsCount: 0,
      documents: [],
      filters: {},
      page: 1,
      hasMoreDocs: true
    }

    this.MapService = new MapService();
    this.allMunicipalities = [];

    this.DocumentService = new DocumentService();

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
      });
      this.setState({municipalities: this.allMunicipalities})
    })
  }

  cacheNames(geoResponse) {
    if (geoResponse.properties) {
      ['GM', 'WK', 'BU']
      .map(prefix => {
        const name = geoResponse.properties[`${prefix}_NAAM`];
        const code = geoResponse.properties[`${prefix}_CODE`];
        if (name) {
          this.state.namesByCode.set(code, name);
        }
      });
    } else {
      geoResponse.features
      .map(
        feature => {
          ['GM', 'WK', 'BU']
          .map(prefix => {
            const name = feature.properties[`${prefix}_NAAM`];
            const code = feature.properties[`${prefix}_CODE`];
            if (name) {
              this.state.namesByCode.set(code, name);
            }
          })
        }
      )
    }
  }

  async showUserLocation() {
    await this.setState({loadingLocation: true});
    let [code, name] = await this.MapService.getUserLocation();
    const geo = await this.MapService.getFeatures(code);
    this.cacheNames(geo);
    const adjacent = await this.MapService.getAdjacentFeatures(code);
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
    const {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(this.state.code, query);
    const page = 1;
    const hasMoreDocs = true;
    this.setState({query, facets, documentsCount, documents, filters, page, hasMoreDocs})
  }

  async selectArea(code, name) {
    if ( !code ) {
      FiltersService.reset();
      this.setState({code, municipalities: this.allMunicipalities, filters: {}})
    } else {
      const geo = await this.MapService.getFeatures(code);
      this.cacheNames(geo);
      const adjacent = await this.MapService.getAdjacentFeatures(code);
      let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(code);
      const hasMoreDocs = true;
      if ( !name ) {
        name = this.state.namesByCode.get(code);
      }
      this.setState({code, geo, adjacent, name, facets, documentsCount, documents, hasMoreDocs})
    }
  }

  async getMoreDocuments(page) {
    const filters = Object.assign({}, this.state.filters);
    FiltersService.set(filters);
    let {meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(this.state.code, this.state.query, page);
    const hasMoreDocs = (page - 1) * 5 < documentsCount;
    this.setState({documentsCount, documents: [...this.state.documents.concat(documents)], page, hasMoreDocs})
  }

  async selectMunicipality(code, name) {
    const geo = await this.MapService.getFeatures(code);
    this.cacheNames(geo);
    const adjacent = await this.MapService.getAdjacentFeatures(code);
    let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(code);
    const hasMoreDocs = true;
    this.setState({code, geo, adjacent, name, facets, documentsCount, documents, hasMoreDocs})
  }

  filterMunicipalities(q) {
    let municipalities = this.allMunicipalities.filter(item => {
      let name = item.name.toLowerCase();
      return name.indexOf(q) >= 0 || levenshtein(name, q) <= 2
    }).sort(function(a, b){
      if ( a.name < b.name ) { return -1 }
      if ( a.name > b.name ) { return 1 }
      return 0
    });
    this.setState({municipalities})
  }

  resetQuery() {
    this.setState({query: ''});
    this.handleOnSubmitSearch('', this.state.filters)
  }

  updateFilters(key, filterName) {
    const filters = Object.assign({}, this.state.filters);
    const query = this.state.query;
    if(filterName === 'start_date') {
      delete filters.start_date
    }

    if(filterName === 'classification') {
      filters[filterName].terms = this.state.filters[filterName].terms.filter(tag => tag !== key);
      if(!filters[filterName].terms.length) {
        delete filters[filterName]
      }
    }
    
    FiltersService.reset();
    FiltersService.set(filters);
    this.setState({filters}, () => this.handleOnSubmitSearch(query, filters));
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
        <NavigableMap
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
