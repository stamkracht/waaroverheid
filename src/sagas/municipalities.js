import { takeLatest } from 'redux-saga/effects'
import {FETCH_MUNICIPALITIES, FETCH_USER_LOCATION, fetchMunicipalities, fetchUserLocation} from '../actions'

export function* watchFetchMunicipalities() {
  yield takeLatest(FETCH_MUNICIPALITIES, fetchMunicipalities);
}

export function* watchGetUserLocation() {
  yield takeLatest(FETCH_USER_LOCATION, fetchUserLocation)
}
