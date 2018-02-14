import { watchFetchMunicipalities, watchGetUserLocation } from './municipalities';
import {
    watchFetchArea,
    watchFetchSearch,
    watchFetchMoreDocuments,
    watchFetchResetFilters,
    watchFetchInitialLocation,
    watchFetchUpdateQuery,
    watchFetchRemoveFilters,
    watchFetchToggleDrawer,
    watchFetchResetArea,
    watchFetchAdjacentArea
} from './map';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        watchFetchMunicipalities(),
        watchGetUserLocation(),
        watchFetchArea(),
        watchFetchSearch(),
        watchFetchMoreDocuments(),
        watchFetchResetFilters(),
        watchFetchInitialLocation(),
        watchFetchUpdateQuery(),
        watchFetchRemoveFilters(),
        watchFetchToggleDrawer(),
        watchFetchResetArea(),
        watchFetchAdjacentArea()
    ]);
}
