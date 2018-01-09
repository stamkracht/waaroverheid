class LocationService {

  constructor() {
    this.coords = {}
  }

  getCoords() {
    return new Promise((resolve, reject) => {
      if ( !!navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition(position => {
          this.coords = position.coords
          resolve(position.coords)
        })
      } else {
        reject()
      }
    })
  }
}

export default LocationService
