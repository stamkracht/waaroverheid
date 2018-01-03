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
    fetch('https://waaroverheid.cleverdon.hum.uva.nl/municipal/GM0344/districts', {
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
    let tooltip = `
      <h1>${feature.properties['GM_NAAM']}</h1>
      <h1>#${feature.properties['GM_CODE']}</h1>
    `
    layer.bindTooltip(tooltip, {className: 'c-tooltip'})
    layer.on({
      click: this.handleOnClick,
    })
  }

  getZoomLevel(level=this.props.level) {
    if ( level === 'BU' ) {
      return 18
    } else if ( level === 'WK' ) {
      return 15
    } else if ( level === 'GM' ) {
      return 12
    } else {
      return 8
    }
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
          zoom={this.getZoomLevel()}
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
  level: 'GM',
}

export default Map
