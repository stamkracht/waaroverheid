import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

import '../styles/map.css'

class Map extends Component {
  render() {
    let position = [52.371, 4.925]
    let zoom = 17
    return (
      <div className="c-map">
        <LeafletMap center={position} zoom={zoom}>
          <TileLayer
            attributoin='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
          />
        </LeafletMap>
      </div>
    )
  }
}

export default Map
