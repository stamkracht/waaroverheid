import React, { Component } from 'react'
import hash from 'object-hash'
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'

import '../styles/map.css'


class Map extends Component {

  componentDidUpdate() {
    if ( !!this.featureNode ) {
      let element = this.featureNode.leafletElement
      element._map.fitBounds(element.getBounds())
    }
  }

  handleOnClick = (e) => {
    let props = e.target.feature.properties
    let level = this.props.code.slice(0, 2)
    if ( level === 'GM' ) {
      this.props.select(props['WK_CODE'])
    } else if ( level === 'WK' ) {
      this.props.select(props['BU_CODE'])
    } else if ( level === 'BU' ) {
      this.props.select(props['GM_CODE'])
    }
  }

  onEachFeature = (feature, layer) => {
    let name, code
    if ( this.props.code.slice(0, 2) === 'GM' ) {
      name = feature.properties['WK_NAAM']
      code = feature.properties['WK_CODE']
    } else {
      name = feature.properties['BU_NAAM']
      code = feature.properties['BU_CODE']
    }
    let tooltip = `
        <h1>${name}</h1>
        <h1>#${code}</h1>
      `
    layer.bindTooltip(tooltip, {className: 'c-tooltip'})
    layer.on({
      click: this.handleOnClick,
    })
  }

  renderFeatures() {
    if ( Object.keys(this.props.geo).length > 0 ) {
      return (
        <GeoJSON className={'feature'}
          ref={(node) => { this.featureNode = node }}
          key={hash(this.props.geo)}
          data={this.props.geo}
          onEachFeature={this.onEachFeature} />
      )
    }
  }

  render() {
    let position = [52.08425313826753, 5.082550048828126]
    return (
      <div className="c-map">
        <LeafletMap
          center={position}
          zoom={12}
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
  geo: {},
  code: '',
  select: undefined,
}

export default Map
