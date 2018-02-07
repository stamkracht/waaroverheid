import React from 'react'
import Alert from './Alert'
import NavigableMap from './NavigableMap'
import Drawer from './Drawer'
import ZoomControls from './ZoomControls'
import Filters from './Filters'
import * as MapService from '../services/MapService'
import { updateQuery, resetQuery } from '../actions/map';

class Map extends React.Component {
    
    componentWillMount() {
      this.props.setFiltersfromURL(this.props.location.search, this.props.match.params)
      this.props.getArea(this.props.match.params.code)
    } 

    componentWillReceiveProps({code}) {
      if(this.props.code && code !== this.props.code) {
        this.props.history.push(code)
        this.props.getArea(code);
      }
    }

    async removeFilters(key, filterName) {
      const {
        removeFilters, 
        getSearch,
        code,
        filters,
        query
      } = this.props;
      await removeFilters({key, filterName});
      getSearch({code, filters, query})
    }

    async resetQuery() {
      const {
        updateQuery,
        getSearch,
        code,
        filters,
        query
      } = this.props;
      await updateQuery('');
      getSearch({code, filters, query})
    }


  render() {

    const {
      geo,
      adjacent,
      code,
      counts,
      getArea,
      getSearch,
      facets,
      filters,
      openDrawer,
      drawerActive,
      documentsCount,
      changePage,
      name,
      history,
      query,
      resetQuery,
      updateFilters,
      updateQuery,
      location: {search}      
    } = this.props;

    console.log(this.props)
    return (
    <div>
      <NavigableMap
        geo={geo}
        adjacent={adjacent}
        code={code}
        counts={MapService.getAreaCounts(
            facets,
            code,
            documentsCount
        )}
        select={getArea}
        openDrawer={openDrawer} />

       {!drawerActive && 
        <ZoomControls
         code={code}
         setZoomLevel={getArea}
         history={history}
         search={search}/>
      }
      {!drawerActive && documentsCount &&
        <Filters
        facets={facets}
        updateFilters={updateFilters}
        updateQuery={updateQuery}
        submit={() => getSearch({code, query, filters})} />
      }
      
      <Alert
        area={name}
        filters={filters['classification'] || {}}
        removeFilters={this.removeFilters.bind(this)}
        query={query}
        resetQuery={this.resetQuery.bind(this)}/>

      {/*
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
        hasMoreDocs={this.state.hasMoreDocs}/> */}

    </div>)
  }

}
    
export default Map;