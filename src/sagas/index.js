import {watchFetchMunicipalities, watchGetUserLocation} from './municipalities'
import {watchFetchArea, watchFetchSearch} from './map'
import { all } from 'redux-saga/effects'


export default function* rootSaga() {
    yield all([
        watchFetchMunicipalities(),
        watchGetUserLocation(),
        watchFetchArea(),
        watchFetchSearch()
    ])
}