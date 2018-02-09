import { takeLatest } from 'redux-saga/effects'
import {fetchArea, fetchSearch, fetchMoreDocs} from '../actions/map'
import * as TYPES from '../types';

export function* watchFetchArea() {
  yield takeLatest(TYPES.FETCH_AREA, fetchArea);
}

export function* watchFetchSearch() {
  yield takeLatest(TYPES.FETCH_SEARCH, fetchSearch)
}

export function* watchFetchMoreDocuments() {
  yield takeLatest(TYPES.FETCH_MORE_DOCS, fetchMoreDocs)
}