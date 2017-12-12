import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer, Polygon } from 'react-leaflet'

import '../styles/map.css'

class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      polygons: [],
    }
  }

  componentDidMount() {
    fetch('http://waaroverheid.cleverdon.hum.uva.nl/municipal/06/neighborhoods', {
      method: 'GET',
    })
      .then(d => d.json())
      .then(d => {
        let polygons = d.features.map(f => {
          return f.geometry.coordinates[0].map(c => {
            return c.reverse()
          })
        })
        this.setState({polygons})
      })
      .catch(err => console.log(err))
  }

  handleOnClick(d) {
    console.log(d)
  }

  renderPolygons() {
    return this.state.polygons.map((p, i) => {
      return (
        <Polygon key={i} positions={p} interactive={true} onClick={() => this.handleOnClick(p)} />
      )
    })
  }

  render() {
    let position = [52.0885, 5.1175]
    let zoom = 15
    return (
      <div className="c-map">
        <LeafletMap center={position} zoom={zoom} zoomControl={false} dragging={false} tap={false} boxZoom={false} scrollWheelZoom={false} touchZoom={false} keyboard={false} worldCopyJump={false} doubleClickZoom={false} attributionControl={false}>
          <TileLayer
            attributoin='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
          />
          {this.renderPolygons()}
        </LeafletMap>
      </div>
    )
  }
}

export default Map
