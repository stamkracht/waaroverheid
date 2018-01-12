import React, { Component } from 'react'
import hash from 'object-hash'
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet'
import { classNames } from '../utilities/class'

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

  handleOnClickAdjacent = (e) => {
    let props = e.target.feature.properties
    this.props.select(props[`${this.props.code.slice(0, 2)}_CODE`])
  }

  onEachFeature(feature, layer) {
    let name, code
    if ( this.props.code.indexOf('GM') === 0 ) {
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
    layer.setStyle({
      'className': classNames('c-feature', {
        'active': this.props.code.indexOf('BU') === 0,
      }),
    })
    layer.bindTooltip(tooltip, {
      'className': 'c-tooltip',
      permanent: this.props.code.indexOf('BU') === 0,
    })
    layer.on({
      click: this.handleOnClick,
    })
  }

  onEachAdjacentFeature(feature, layer) {
    let tooltip = `
      <h1>${feature.properties[`${this.props.code.slice(0, 2)}_NAAM`]}</h1>
      <h1>#${feature.properties[`${this.props.code.slice(0, 2)}_CODE`]}</h1>
    `
    layer.setStyle({
      'className': 'c-feature adjacent',
    })
    layer.bindTooltip(tooltip, {
      'className': 'c-tooltip',
      permanent: this.props.code.indexOf('BU') === 0,
    })
    layer.on({
      click: this.handleOnClickAdjacent,
    })
  }

  renderSelectedArea() {
    if ( Object.keys(this.props.geo).length > 0 ) {
      return (
        <GeoJSON className={'feature'}
          ref={(node) => { this.featureNode = node }}
          key={hash(this.props.geo)}
          data={this.props.geo}
          onEachFeature={this.onEachFeature.bind(this)} />
      )
    }
  }

  renderAdjacentArea() {
    if ( Object.keys(this.props.adjacent).length > 0 ) {
      return (
        <GeoJSON className={'feature'}
          key={hash(this.props.adjacent)}
          data={this.props.adjacent}
          onEachFeature={this.onEachAdjacentFeature.bind(this)} />
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
          {this.renderSelectedArea()}
          {this.renderAdjacentArea()}
        </LeafletMap>
      </div>
    )
  }
}

Map.defaultProps = {
  code: '',
  select: undefined,
  geo: {},
  adjacent: {},
}

export default Map
