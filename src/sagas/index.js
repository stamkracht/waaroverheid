import {watchFetchMunicipalities} from './municipalities'
import { all } from 'redux-saga/effects'


export default function* rootSaga() {
    yield all([
        watchFetchMunicipalities()
    ])
}