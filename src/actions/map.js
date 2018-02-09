import { all, call, put } from 'redux-saga/effects'
import * as TYPES from '../types'
import * as MapService from '../services/MapService'
import * as Search from '../services/SearchService'

 
export const setFiltersfromURL = (search, params) => ({
    type: TYPES.SET_FILTERS_FROM_URL,
    search,
    params
})

export const getArea = (code) => ({
    type: TYPES.FETCH_AREA, code
})

export const getSearch = ({code, query, filters, page}) => ({
    type: TYPES.FETCH_SEARCH, code, query, filters, page
})

export const updateFilters = (filters) => ({
    type: TYPES.UPDATE_FILTERS, filters
})

export const updateQuery = (query) => ({
    type: TYPES.UPDATE_QUERY, query
})

export const removeFilters = (filters) => ({
    type: TYPES.REMOVE_FILTERS, filters
})

export const toggleDrawer = (isDrawerOpen) => ({
    type: TYPES.TOGGLE_DRAWER, isDrawerOpen
})

export const getMoreDocs = ({code, query, filters, page}) => ({
    type: TYPES.FETCH_MORE_DOCS, code, query, filters, page
})

  
export function* fetchArea(action) {
    try {
        const geo = yield call(MapService.getFeatures, action.code)
        const adjacent = yield call(MapService.getAdjacentFeatures, action.code)
        const search = yield call(Search.search, action.code)
        yield put({type: TYPES.SELECT_AREA, geo, adjacent, search, code: action.code});
    } catch (e) {
        //handle faled
        console.log(e, 'failed')
    }
}

export function* fetchSearch({code, query, filters, page}) {
    try {
        const search = yield call(Search.search, code, query, filters, page)   
        yield put({type: TYPES.SEARCH, search});        
    } catch (e) {
        //handle faled
        console.log(e, 'failed')
    }
}

export function* fetchMoreDocs({code, query, filters, page}) {
    try {
        const search = yield call(Search.search, code, query, filters, page)   
        yield put({type: TYPES.GET_MORE_DOCS, search});        
    } catch (e) {
        //handle faled
        console.log(e, 'failed')
    }
}