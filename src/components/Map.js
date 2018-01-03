import React, { Component } from 'react'
import hash from 'object-hash'
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'

import '../styles/map.css'


class Map extends Component {

  constructor(props) {
    super(props)

    this.apiUrl = 'https://waaroverheid.cleverdon.hum.uva.nl/municipal/'
    this.levels = {
      'PR': { zoom: 8, sub: 'municipalities' },
      'GM': { zoom: 12, sub: 'districts' },
      'WK': { zoom: 15, sub: 'neighborhoods' },
      'BU': { zoom: 18, sub: '' },
    }

    this.state = {
      geo: {},
    }
  }

  componentDidMount() {
    this.getFeatures(this.props.level, 'GM0344')
  }

  componentWillReceiveProps(nextProps) {
    this.getFeature(nextProps.level, nextProps.code)
  }

  getFeatures(level=this.props.level, code) {
    let url = `${this.apiUrl}${code}`
    if ( !!this.levels[level].sub ) {
      url += `/${this.levels[level].sub}`
    }
    fetch(url, {
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

  renderFeatures() {
    if ( Object.keys(this.state.geo).length > 0 ) {
      return (
        <GeoJSON className={'feature'}
          key={hash(this.state.geo)}
          data={this.state.geo}
          onEachFeature={this.onEachFeature} />
      )
    }
  }

  render() {
    let position = [52.0885, 5.1175]
    let zoom = this.levels[this.props.level].zoom
    return (
      <div className="c-map">
        <LeafletMap
          center={position}
          zoom={zoom}
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
