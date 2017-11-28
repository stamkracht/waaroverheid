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
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        </LeafletMap>
      </div>
    )
  }
}

export default Map
