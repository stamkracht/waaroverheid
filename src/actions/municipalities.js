import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as MapService from '../services/MapService';
import * as TYPES from '../types';
import { push } from 'react-router-redux';

export function chooseMunicipalitu(municipality) {
    return { type: TYPES.CHOOSE_MUNICIPALITY, municipality };
}

export function filterMunicipalities(term) {
    return { type: TYPES.FILTER_MUNICIPALITIES, term };
}

export const getUserLocation = () => ({
    type: TYPES.FETCH_USER_LOCATION
});

export const getMunicipalities = () => ({
    type: TYPES.FETCH_MUNICIPALITIES
});

export const showUserLocation = () => ({
    type: TYPES.SHOW_USER_LOCATION
});

export const resetLocation = () => ({
    type: TYPES.RESET_LOCATION
});

export function* fetchMunicipalities(action) {
    try {
        const municipalities = yield call(MapService.getMunicipalities);
        yield put({ type: TYPES.SET_INITIAL_MUNICIPALITIES, municipalities });
    } catch (e) {
        //handle faled
        console.log(e, 'failed');
    }
}

export function* fetchUserLocation(action) {
    try {
        yield put({ type: TYPES.SHOW_USER_LOCATION });
        const code = yield call(MapService.getUserLocation);
        yield put(push(`/${code}`));
        yield put({ type: TYPES.RESET_LOCATION });
    } catch (e) {
        yield put({ type: TYPES.SHOW_USER_LOCATION_FAILED });
        yield delay(3500);
        yield put({ type: TYPES.RESET_LOCATION });
    }
}
