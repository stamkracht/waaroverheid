import { takeLatest } from 'redux-saga/effects';
import {
    fetchArea,
    fetchSearch,
    fetchMoreDocs,
    fetchResetFilters,
    fetchInitialLocation,
    fetchUpdateQuery,
    fetchRemoveFilters,
    fetchToggleDrawer,
    fetchResetArea,
    fetchAdjacentArea
} from '../actions/map';
import * as TYPES from '../types';

export function* watchFetchArea() {
    yield takeLatest(TYPES.FETCH_AREA, fetchArea);
}

export function* watchFetchSearch() {
    yield takeLatest(TYPES.FETCH_SEARCH, fetchSearch);
}

export function* watchFetchMoreDocuments() {
    yield takeLatest(TYPES.FETCH_MORE_DOCS, fetchMoreDocs);
}

export function* watchFetchResetFilters() {
    yield takeLatest(TYPES.FETCH_RESET_FILTERS, fetchResetFilters);
}

export function* watchFetchInitialLocation() {
    yield takeLatest(TYPES.FETCH_INITIAL_LOCATION, fetchInitialLocation);
}

export function* watchFetchUpdateQuery() {
    yield takeLatest(TYPES.FETCH_UPDATE_QUERY, fetchUpdateQuery);
}

export function* watchFetchRemoveFilters() {
    yield takeLatest(TYPES.FETCH_REMOVE_FILTERS, fetchRemoveFilters);
}

export function* watchFetchToggleDrawer() {
    yield takeLatest(TYPES.FETCH_TOGGLE_DRAWER, fetchToggleDrawer);
}

export function* watchFetchResetArea() {
    yield takeLatest(TYPES.FETCH_RESET_AREA, fetchResetArea);
}

export function* watchFetchAdjacentArea() {
    yield takeLatest(TYPES.FETCH_ADJACENT_AREA, fetchAdjacentArea);
}
