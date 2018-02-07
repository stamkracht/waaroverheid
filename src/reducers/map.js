import {
   SET_FILTERS_FROM_URL,
   SELECT_AREA,
   TOGGLE_DRAWER,
   SEARCH,
   UPDATE_FILTERS,
   RESET_FILTERS,
   UPDATE_QUERY,
   REMOVE_FILTERS
} from '../types'

const BASE_FILTERS = { 
    start_date: null,
    classification: null,
    types: {terms: ['events']}
};

const initialState = {
   filters: Object.assign({}, BASE_FILTERS),
   geo: {},
   adjacent: {},
   code: '',
   search: {},
   hasMoreDocs: true,
   drawerOpen: false,
   namesByCode: new Map()
};

//TODO: move to utility of some sort
//TODO make functional
function getName(geoResponse) {
    let name = '';

    if (geoResponse.properties) {
      ['GM', 'WK', 'BU']
        .filter(prefix => geoResponse.properties[`${prefix}_NAAM`])      
        .map(prefix => name = geoResponse.properties[`${prefix}_NAAM`]);
    } else if(geoResponse.features) {
      geoResponse.features
      .map(
        feature => {
          ['GM', 'WK', 'BU']
            .filter(prefix => feature.properties[`${prefix}_NAAM`])
            .map(prefix => name = feature.properties[`${prefix}_NAAM`])
        }
      )
    }

    return name;
  }

  function removeFilters(stateFilters, {key, filterName}) {
    const filters = Object.assign({}, stateFilters);
    if(filterName === 'start_date') {
      delete filters.start_date
    }

    if(filterName === 'classification') {
      filters[filterName].terms = stateFilters[filterName].terms.filter(tag => tag !== key);
      if(!filters[filterName].terms.length) {
        delete filters[filterName]
      }
    }

    return filters;
  }


function map(state = initialState, action) {
    switch(action.type) {        
        case SET_FILTERS_FROM_URL:
            const searchParams = new URLSearchParams(action.search);    
            let filters = {};
            for(let params of searchParams) {
                filters[params[0]] = {terms: [...params[1].split(',')]};
            }
            return {...state, filters: Object.assign({}, state.filters, filters)}
        case SELECT_AREA:         
            return {
                ...state,
                code: action.code,
                geo: action.geo,
                adjacent: action.adjacent,
                search: action.search,            
                name: getName(action.geo)                
            }
        case TOGGLE_DRAWER:
            return {
                ...state,
                drawerOpen: action.drawerOpen
            }
        case SEARCH:
            return {
                ...state,
                search: action.search
            }
        case UPDATE_FILTERS: 
            return {
                ...state,
                filters: Object.assign({}, state.filters, action.filters)
            }
        case RESET_FILTERS:
            return {
                ...state,
                filters: Object.assign({}, BASE_FILTERS)
            }
        case REMOVE_FILTERS: 
            return {
                ...state,
                filters: removeFilters(state.filters, action.filters)
            }
        case UPDATE_QUERY:
            return {
                ...state,
                query: action.query
            }

        default:
            return state
    }
}

export default map    