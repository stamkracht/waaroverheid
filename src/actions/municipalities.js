import { call, put } from 'redux-saga/effects'
import * as MapService from '../services/MapService'
import * as TYPES from '../types'

  export function chooseMunicipalitu(municipality) {
      return {type: TYPES.CHOOSE_MUNICIPALITY, municipality}
  }

  export function filterMunicipalities(term) {
      return {type: TYPES.FILTER_MUNICIPALITIES, term}
  }

  export const getUserLocation = () => ({
      type: TYPES.FETCH_USER_LOCATION
  })

  export const getMunicipalities = () => ({
      type: TYPES.FETCH_MUNICIPALITIES
  })

  export function showUserLocation(location) {
      return {type: TYPES.SHOW_USER_LOCATION, location}
  }

  export function showUserLocationError(locationStatus) {
      return {type: TYPES.SHOW_USER_LOCATION_ERROR, locationStatus}
  }

  export function resetUserLocation(locationStatus) {
      return {type: TYPES.RESET_USER_LOCATION, locationStatus}
  }
  
  export function* fetchMunicipalities(action) {
     try {
        const municipalities = yield call(MapService.getMunicipalities);
        yield put({type: TYPES.SET_INITIAL_MUNICIPALITIES, municipalities});
     } catch (e) {
        //handle faled
        console.log(e, 'failed')
     }
  }

  export function* fetchUserLocation(action) {
    try {
        const location = yield call(MapService.getUserLocation);
        yield put({type: TYPES.SHOW_USER_LOCATION, location});
     } catch (e) {
        //handle faled
        console.log(e, 'failed')
     }
  }