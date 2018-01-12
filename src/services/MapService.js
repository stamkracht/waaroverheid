import LocationService from '../services/LocationService'
import { isMobile } from '../utilities/device'

class MapService {

  constructor() {
    this.LocationService = new LocationService()

    this.apiUrl = 'https://api.waaroverheid.nl/'

    this.levels = {
      'GM': 'districts',
      'WK': 'neighborhoods',
      'BU': '',
    }
  }

  getUserLocation() {
    return new Promise((resolve, reject) => {
      this.LocationService.getCoords().then(coords => {
        this.getPolygon(coords.latitude, coords.longitude).then(res => {
          if ( isMobile() ) {
            resolve(res.properties['BU_CODE'])
          } else {
            resolve(res.properties['GM_CODE'])
          }
        })
      })
    })
  }

  getPolygon(latitude, longitude) {
    let url = `${this.apiUrl}localize?lat=${latitude}&lon=${longitude}`
    if ( isMobile() ) {
      url += `&type=neighborhood`
    } else {
      url += `&type=municipality`
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
      })
        .then(d => d.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }

  getMunicipalities() {
    return new Promise((resolve, reject) => {
      fetch(`${this.apiUrl}municipal`, {
        method: 'GET',
      })
        .then(d => d.json())
        .then(res => resolve(res['municipalities']))
        .catch(err => reject(err))
    })
  }

  getFeatures(code) {
    let url = `${this.apiUrl}municipal/${code}`
    if ( !!this.levels[code.slice(0, 2)] ) {
      url += `/${this.levels[code.slice(0, 2)]}`
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
      })
        .then(d => d.json())
        .then(geo => resolve(geo))
        .catch(err => reject(err))
    })
  }

  getAdjacentFeatures(code) {
    let url = `${this.apiUrl}municipal/${code}/adjacent`
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
      })
        .then(d => d.json())
        .then(geo => resolve(geo))
        .catch(err => reject(err))
    })
  }
}

export default MapService
