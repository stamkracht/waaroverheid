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
    if ( this.props.level === 'GM' ) {
      this.props.setZoomLevel('WK', props['WK_CODE'])
    } else if ( this.props.level === 'WK' ) {
      this.props.setZoomLevel('BU', props['BU_CODE'])
    } else if ( this.props.level === 'BU' ) {
      this.props.setZoomLevel('GM', props['GM_CODE'])
    }
  }

  onEachFeature = (feature, layer) => {
    let tooltip
    if ( this.props.level === 'GM' ) {
      tooltip = `
        <h1>${feature.properties['WK_NAAM']}</h1>
        <h1>#${feature.properties['WK_CODE']}</h1>
      `
    } else if ( this.props.level === 'WK' ) {
      tooltip = `
        <h1>${feature.properties['BU_NAAM']}</h1>
        <h1>#${feature.properties['BU_CODE']}</h1>
      `
    } else if ( this.props.level === 'BU' ) {
      tooltip = `
        <h1>${feature.properties['BU_NAAM']}</h1>
        <h1>#${feature.properties['BU_CODE']}</h1>
      `
    }
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
  level: 'GM',
  setZoomLevel: undefined,
}

export default Map
