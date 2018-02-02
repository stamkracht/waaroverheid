/**
 * Action Types
 */

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

  export function setInitialMunicipalities(municipalities) {
      return {type: SET_INITIAL_MUNICIPALITIES, municipalities}
  }

  export function showUserLocation(locationStatus) {
      return {type: SHOW_USER_LOCATION, locationStatus}
  }

  export function showUserLocationError(locationStatus) {
      return {type: SHOW_USER_LOCATION_ERROR, locationStatus}
  }

  export function resetUserLocation(locationStatus) {
      return {type: RESET_USER_LOCATION, locationStatus}
  }