class LocationService {

  constructor() {
    this.coords = {}

    this.options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    }
  }

  getCoords() {
    return new Promise((resolve, reject) => {
      if ( !!navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition((position, a, b, c, d, e) => {
          this.coords = position.coords
          resolve(position.coords)
        }, (err) => {
          reject(`errr (${err.code}): ${err.message}`)
        }, this.options)
      } else {
        reject(`geolocation is not available`)
      }
    })
  }
}

export default LocationService
