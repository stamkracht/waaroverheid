import React from 'react'

import NavigableMap from '../components/NavigableMap'
import MapService from '../services/MapService'
import ZoomControls from '../components/ZoomControls'
import Alert from '../components/Alert'
import Filters from '../components/Filters'
import Drawer from '../components/Drawer'
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
    };

    this.MapService = new MapService();
    this.DocumentService = new DocumentService();
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown, false)
    const searchParams = new URLSearchParams(this.props.location.search);
    const {code} = this.props.match.params
    
    let filters = {};
    for(let params of searchParams) {
      filters[params[0]] = {terms: [...params[1].split(',')]};
    }
    FiltersService.set(filters);
    this.setState({filters, code}, () => {
      this.selectArea(code)
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  async componentWillReceiveProps(nextProps) {  
    const {code} = nextProps.match.params
    if(this.state.code !== code) {
      const geo = await this.MapService.getFeatures(code);
      const adjacent = await this.MapService.getAdjacentFeatures(code);
      let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(code);
      const hasMoreDocs = true;
      this.setState({code, geo, adjacent, facets, documentsCount, documents, hasMoreDocs})
    }
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
    } else if(geoResponse.features) {
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
    let filtersSliced = this.state.filters['classification'];
    return filtersSliced
  }

  async handleOnSubmitSearch(query, filters) {
    const {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(this.state.code, query);
    const page = 1;
    const hasMoreDocs = true;
    this.setState({query, facets, documentsCount, documents, filters, page, hasMoreDocs}, () => this.handleRouting(this.props.match.params.code))
  }

  getSearchParams() {
    const searchParams = new URLSearchParams();   
    Object.keys(this.state.filters).map(filter => searchParams.append(filter, this.state.filters[filter].terms));
    return searchParams.toString(); 
  }

  handleRouting(code) {
    let url = `/${code}`;
    const searchParams = this.getSearchParams()
    url = searchParams ? `${url}?${searchParams}` : url;  
    this.props.history.push(url);
  }

  async selectArea(code, name) {
    if(!code) { return; }
    this.handleRouting(code);
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

  async selectMunicipality(code, name) {
    const geo = await this.MapService.getFeatures(code);
    this.cacheNames(geo);
    const adjacent = await this.MapService.getAdjacentFeatures(code);
    let {facets, meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(code);
    const hasMoreDocs = true;
    this.setState({code, geo, adjacent, name, facets, documentsCount, documents, hasMoreDocs})
  }

  async getMoreDocuments(page) {
    const filters = Object.assign({}, this.state.filters);
    FiltersService.set(filters);
    let {meta: {total: documentsCount}=0, events: documents=[]} = await SearchService.search(this.state.code, this.state.query, page);
    const hasMoreDocs = (page - 1) * 5 < documentsCount;
    this.setState({documentsCount, documents: [...this.state.documents.concat(documents)], page, hasMoreDocs})
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

  renderControls() {
    if ( !this.state.drawerActive ) {
      return (
        <ZoomControls
          code={this.state.code}
          setZoomLevel={this.selectArea.bind(this)}
          search={this.props.location.search}/>
      )
    }
  }

  renderFilters() {
    if ( !this.state.drawerActive && this.state.documentsCount) {
      return (
        <div>
          <Filters
            facets={this.state.facets}
            submit={this.handleOnSubmitSearch.bind(this)} />
        </div>
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
        {this.renderControls()}
        {this.renderFilters()}
        <Alert
          service={this.DocumentService}
          area={this.state.name}
          filters={this.sliceFilters()}
          updateFilters={this.updateFilters.bind(this)}
          query={this.state.query}
          resetQuery={this.resetQuery.bind(this)}/>

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
          hasMoreDocs={this.state.hasMoreDocs}/>
        </div>
    )
  }
}

export default App
