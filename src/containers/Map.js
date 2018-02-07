import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
 setFiltersfromURL,
 getArea,
 getSearch,
 updateFilters,
 updateQuery,
 removeFilters
} from '../actions/map'
import Map from '../components/Map'

const mapStateToProps = state => {
  console.log(state)
  const {
    geo,
    adjacent,
    code,
    hasMoreDocs,
    counts,
    filters,
    name,
    query
  } = state.map;

  const {
    facets,
    meta: {total: documentsCount}=0,
    events: documents=[]
  } = state.map.search;

  return {
    geo,
    adjacent,
    code,
    facets,
    documentsCount,
    documents,
    hasMoreDocs,
    counts,
    filters,
    name,
    query
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (code) => push(`/${code}`),  
  setFiltersfromURL,
  getArea,
  getSearch,
  updateFilters,
  updateQuery,
  removeFilters
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Map)