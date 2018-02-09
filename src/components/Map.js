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

    componentWillUpdate({code, filters}) {
      
      if(this.props.code && code !== this.props.code) {
        this.props.getArea(code)        
        this.props.history.push(code)
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

    getMoreDocuments(page) {
      const {
        getMoreDocs,
        code,
        filters,
        query
      } = this.props;
      getMoreDocs({code, filters, query, page}) 
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
      documents,
      hasMoreDocs,
      isDrawerOpen,
      documentsCount,
      toggleDrawer,
      changePage,
      name,
      history,
      query,
      resetQuery,
      updateFilters,
      updateQuery,
      getMoreDocuments,
      location: {search}      
    } = this.props;

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
        isDrawerOpen={isDrawerOpen} />

       {!isDrawerOpen && 
        <ZoomControls
         code={code}
         setZoomLevel={getArea}
         history={history}
         search={search}/>
      }
      {!isDrawerOpen && documentsCount &&
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

      
      <Drawer
        documentsCount={documentsCount}
        area={name}
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        service={this.DocumentService}
        facets={facets}
        documents={documents}
        filters={filters}
        removeFilters={this.removeFilters.bind(this)}
        query={query}
        resetQuery={this.resetQuery.bind(this)}
        getMoreDocuments={this.getMoreDocuments.bind(this)}
        hasMoreDocs={hasMoreDocs}/>

    </div>)
  }

}
    
export default Map;