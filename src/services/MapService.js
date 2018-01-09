import L from 'leaflet'

class MapService {

  constructor() {
    this.apiUrl = 'https://api.waaroverheid.nl/'

    this.levels = {
      'GM': 'districts',
      'WK': 'neighborhoods',
      'BU': '',
    }
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
}

export default MapService
