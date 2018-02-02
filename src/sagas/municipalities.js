import { call, put, takeLatest } from 'redux-saga/effects'
import MapService from '../services/MapService'
import {FETCH_MUNICIPALITIES, fetchMunicipalities} from '../actions'

export function* watchFetchMunicipalities() {
  yield takeLatest(FETCH_MUNICIPALITIES, fetchMunicipalities);
}
