class MapService {

  constructor() {
    this.apiUrl = 'https://api.waaroverheid.nl/'

    this.levels = {
      'PR': { zoom: 8, sub: 'municipalities' },
      'GM': { zoom: 12, sub: 'districts' },
      'WK': { zoom: 15, sub: 'neighborhoods' },
      'BU': { zoom: 18, sub: '' },
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

  getFeatures(level, code) {
    let url = `${this.apiUrl}municipal/${code}`
    if ( !!this.levels[level].sub ) {
      url += `/${this.levels[level].sub}`
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
