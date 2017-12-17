import React, { Component } from 'react'
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'

import '../styles/map.css'

class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      geo: {},
    }
  }

  componentDidMount() {
    fetch('https://waaroverheid.cleverdon.hum.uva.nl/municipal/06/neighborhoods', {
      method: 'GET',
    })
      .then(d => d.json())
      .then(geo => {
        this.setState({geo})
      })
      .catch(err => console.log(err))
  }

  handleOnClick = (e) => {
    e.target._map.fitBounds(e.target.getBounds())
  }

  onEachFeature = (feature, layer) => {
    layer.on({
      click: this.handleOnClick,
    })
  }

  renderFeatures() {
    if ( Object.keys(this.state.geo).length > 0 ) {
      return (
        <GeoJSON className={'feature'}
          data={this.state.geo}
          onEachFeature={this.onEachFeature} />
      )
    }
  }

  render() {
    let position = [52.0885, 5.1175]
    return (
      <div className="c-map">
        <LeafletMap
          center={position}
          zoom={this.props.zoom}
          zoomControl={false}
          dragging={false}
          tap={false}
          boxZoom={false}
          scrollWheelZoom={false}
          touchZoom={false}
          keyboard={false}
          worldCopyJump={false}
          doubleClickZoom={false}
          attributionControl={false}>
          <TileLayer
            attributoin='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
          />
          {this.renderFeatures()}
        </LeafletMap>
      </div>
    )
  }
}

Map.defaultProps = {
  zoom: 15,
}

export default Map
