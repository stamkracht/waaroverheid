import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'

import '../styles/map.css'

class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      geojson: {},
    }
  }

  componentDidMount() {
    fetch('http://waaroverheid.cleverdon.hum.uva.nl/municipal/0344', {
      method: 'GET',
    })
      .then(d => d.json())
      .then(d => {
        this.setState({geojson: d})
      })
      .catch(err => console.log(err))
  }

  renderGeoJSON() {
    if ( !!Object.keys(this.state.geojson).length ) {
      return <GeoJSON data={this.state.geojson} />
    }
  }

  render() {
    let position = [52.3695, 4.924]
    let zoom = 18
    return (
      <div className="c-map">
        <LeafletMap center={position} zoom={zoom} zoomControl={false} dragging={false} tap={false} boxZoom={false} scrollWheelZoom={false} touchZoom={false} keyboard={false} worldCopyJump={false} doubleClickZoom={false} attributionControl={false}>
          <TileLayer
            attributoin='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
          />
          {this.renderGeoJSON()}
        </LeafletMap>
      </div>
    )
  }
}

export default Map
