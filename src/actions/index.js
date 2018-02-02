import { call, put, takeLatest } from 'redux-saga/effects'
import MapService from '../services/MapService'

/**
 * Action Types
 */
export const FETCH_MUNICIPALITIES = 'FETCH_MUNICIPALITIES'
 export const CHOOSE_MUNICIPALITY = 'CHOOSE_MUNICIPALITY'
 export const FILTER_MUNICIPALITIES = 'FILTER_MUNICIPALITIES'
 export const SET_INITIAL_MUNICIPALITIES = 'SET_INITIAL_MUNICIPALITIES'
 export const SHOW_USER_LOCATION = 'SHOW_USER_LOCATION'
 export const SHOW_USER_LOCATION_ERROR = 'SHOW_USER_LOCATION_ERROR'
 export const RESET_USER_LOCATION = 'RESET_USER_LOCATION'
 /**
  * Action Creators
  */

  export function chooseMunicipalitu(municipality) {
      return {type: CHOOSE_MUNICIPALITY, municipality}
  }

  export function filterMunicipalities(term) {
      return {type: FILTER_MUNICIPALITIES, term}
  }

  export const getMunicipalities = () => ({
      type: FETCH_MUNICIPALITIES
  })

  export function showUserLocation(locationStatus) {
      return {type: SHOW_USER_LOCATION, locationStatus}
  }

  export function showUserLocationError(locationStatus) {
      return {type: SHOW_USER_LOCATION_ERROR, locationStatus}
  }

  export function resetUserLocation(locationStatus) {
      return {type: RESET_USER_LOCATION, locationStatus}
  }

  const MapApi = new MapService();
  
  export function* fetchMunicipalities(action) {
    console.log(action)
     try {
        const municipalities = yield call(MapApi.getMunicipalities, MapApi.apiUrl);
        yield put({type: SET_INITIAL_MUNICIPALITIES, municipalities});
     } catch (e) {
        //handle faled
        console.log(e, 'failed')
     }
  }