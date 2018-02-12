import * as TYPES from '../types';
import * as utils from '../utilities/map-reducers-utils';

const BASE_FILTERS = {
    start_date: null,
    classification: null,
    types: { terms: ['events'] }
};

const initialState = {
    filters: Object.assign({}, BASE_FILTERS),
    geo: {},
    adjacent: {},
    code: '',
    search: {},
    hasMoreDocs: true,
    isDrawerOpen: false,
    documentsCount: 0
};

function getIsDrawerOpen(search) {}

function map(state = initialState, action) {
    switch (action.type) {
        case TYPES.SET_FILTERS_FROM_URL:
            return {
                ...state,
                filters: Object.assign({}, state.filters, utils.getFiltersFromUrl(action.search)),
                isDrawerOpen: getIsDrawerOpen()
            };
        case TYPES.SELECT_AREA:
            return {
                ...state,
                code: action.code,
                geo: action.geo,
                adjacent: action.adjacent,
                search: action.search,
                name: utils.getName(action.geo)
            };
        case TYPES.TOGGLE_DRAWER:
            return {
                ...state,
                isDrawerOpen: !action.isDrawerOpen
            };
        case TYPES.SEARCH:
            return {
                ...state,
                search: action.search
            };
        case TYPES.UPDATE_FILTERS:
            return {
                ...state,
                filters: Object.assign({}, state.filters, action.filters)
            };
        case TYPES.RESET_FILTERS:
            return {
                ...state,
                filters: Object.assign({}, BASE_FILTERS)
            };
        case TYPES.REMOVE_FILTERS:
            return {
                ...state,
                filters: utils.removeFilters(state.filters, action.filters)
            };
        case TYPES.UPDATE_QUERY:
            return {
                ...state,
                query: action.query
            };
        case TYPES.GET_MORE_DOCS:
            return {
                ...state,
                search: utils.mergeDocuments(state, action.search)
            };
        case TYPES.SET_CODE:
            return {
                ...state,
                code: action.code
            };
        case TYPES.RESET_AREA:
            return Object.assign(...state, initialState);
        default:
            return state;
    }
}

export default map;
