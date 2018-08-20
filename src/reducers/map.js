import * as TYPES from '../types';
import * as utils from '../utilities/map-reducers-utils';

const BASE_FILTERS = {
    start_date: null,
    classification: null,
    types: { terms: ['events'] },
    processing_finished: null
};

const BASE_SEARCH = {
    meta: { total: 0 },
    facets: { start_date: { buckets: [] } },
    events: []
};

const BASE_COUNTS = {
    byCode: {},
    maxCount: 0
};

const initialState = {
    filters: { ...BASE_FILTERS },
    geo: {},
    adjacent: {},
    code: '',
    search: { ...BASE_SEARCH },
    hasMoreDocs: true,
    isDrawerOpen: false,
    documentsCount: 0,
    counts: { ...BASE_COUNTS },
    fetchFailed: false,
    query: '',
    email: '',
    emailFailed: false,
    isModalOpen: false,
    flagFailed: false
};

function map(state = initialState, action) {
    switch (action.type) {
        case TYPES.SET_FILTERS_FROM_URL:
            return {
                ...state,
                code: action.params.code,
                filters: Object.assign({}, state.filters, utils.getFiltersFromUrl(action.search)),
                isDrawerOpen: utils.getIsDrawerOpen(action.search),
                query: utils.getQuery(action.search),
                history: action.history,
                fetchFailed: false,
                searchFailed: false
            };
        case TYPES.FETCH_INITIAL_LOCATION_FAILED:
            return {
                ...state
            };
        case TYPES.SELECT_AREA:
            return {
                ...state,
                code: action.code,
                geo: action.geo,
                adjacent: action.adjacent,
                name: utils.getName(action.geo, action.code),
                fetchFailed: false
            };
        case TYPES.FETCH_AREA_FAILED:
            return {
                ...state,
                geo: {},
                adjacent: {},
                fetchFailed: true
            };
        case TYPES.FETCH_SEARCH_FAILED:
            return {
                ...state,
                searchFailed: true,
                search: { ...BASE_SEARCH },
                counts: { ...BASE_COUNTS }
            };
        case TYPES.TOGGLE_DRAWER:
            return {
                ...state,
                isDrawerOpen: !action.isDrawerOpen,
                hasMoreDocs: true
            };
        case TYPES.TOGGLE_MODAL:
            return {
                ...state,
                isModalOpen: !action.isModalOpen,
                email: ''
            };
        case TYPES.SEARCH:
            return {
                ...state,
                search: action.search,
                counts: action.counts,
                searchFailed: false
            };
        case TYPES.UPDATE_FILTERS:
            return {
                ...state,
                filters: Object.assign({}, state.filters, action.filters)
            };
        case TYPES.RESET_FILTERS:
            return {
                ...state,
                filters: Object.assign({}, BASE_FILTERS),
                query: ''
            };
        case TYPES.REMOVE_FILTERS:
            return {
                ...state,
                filters: utils.removeFilters(state.filters, action.filters),
                hasMoreDocs: true
            };
        case TYPES.UPDATE_QUERY:
            return {
                ...state,
                query: action.query,
                hasMoreDocs: true
            };
        case TYPES.GET_MORE_DOCS:
            return {
                ...state,
                search: utils.mergeDocuments(state, action.search),
                hasMoreDocs: (action.page - 1) * 5 < action.search.meta.total
            };
        case TYPES.SET_CODE:
            return {
                ...state,
                code: action.code
            };
        case TYPES.SUBMIT_ALERT:
            return {
                ...state,
                email: action.email,
                emailFailed: false
            };
        case TYPES.POST_ALERT_SUBSCRIPTION_FAILED:
            return {
                ...state,
                emailFailed: true
            };
        case TYPES.USER_FEEDBACK_SAVED:
            return {
                ...state,
                flagFailed: false
            };
        case TYPES.USER_FEEDBACK_POST_FAILED:
            return {
                ...state,
                flagFailed: true
            };
        case TYPES.RESET_AREA:
            return Object.assign(...state, initialState, { history: state.history });
        default:
            return state;
    }
}

export default map;
