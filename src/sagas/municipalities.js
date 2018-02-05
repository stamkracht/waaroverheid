import { takeLatest } from 'redux-saga/effects'
import * as TYPES from '../types';
import { fetchMunicipalities, fetchUserLocation } from '../actions'

export function* watchFetchMunicipalities() {
  yield takeLatest(TYPES.FETCH_MUNICIPALITIES, fetchMunicipalities);
}

export function* watchGetUserLocation() {
  yield takeLatest(TYPES.FETCH_USER_LOCATION, fetchUserLocation)
}
