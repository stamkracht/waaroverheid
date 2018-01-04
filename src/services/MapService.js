class MapService {

  constructor() {
    this.apiUrl = 'https://waaroverheid.cleverdon.hum.uva.nl/municipal/'

    this.levels = {
      'PR': { zoom: 8, sub: 'municipalities' },
      'GM': { zoom: 12, sub: 'districts' },
      'WK': { zoom: 15, sub: 'neighborhoods' },
      'BU': { zoom: 18, sub: '' },
    }
  }

  getFeatures(level, code) {
    let url = `${this.apiUrl}${code}`
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
