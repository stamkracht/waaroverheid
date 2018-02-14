import React, { Component } from 'react';
import hash from 'object-hash';
import { Map as LeafletMap, TileLayer, GeoJSON } from 'react-leaflet';
import { classNames } from '../utilities/class';

import '../styles/map.css';

class NavigableMap extends Component {
    componentDidUpdate(props) {
        if (!!this.featureNode) {
            let element = this.featureNode.leafletElement;
            element._map.fitBounds(element.getBounds());
        }
    }

    handleOnClick = e => {
        let props = e.target.feature.properties;
        let level = this.props.code.slice(0, 2);
        if (level === 'GM') {
            this.props.selectArea({ code: props['WK_CODE'] });
        } else if (level === 'WK') {
            this.props.selectArea({ code: props['BU_CODE'] });
        } else if (level === 'BU') {
            this.props.openDrawer();
        }
    };

    handleOnClickAdjacent = e => {
        let props = e.target.feature.properties;
        if (!!props['BU_CODE']) {
            this.props.selectAdjacentArea({ code: props['BU_CODE'] });
        } else if (!!props['WK_CODE']) {
            this.props.selectAdjacentArea({ code: props['WK_CODE'] });
        } else if (!!props['GM_CODE']) {
            this.props.selectAdjacentArea({ code: props['GM_CODE'] });
        }
    };

    getOpacity(docCount) {
        if (this.props.counts.maxCount > 0) {
            return 0.8 * (docCount / this.props.counts.maxCount);
        } else {
            return 0.2;
        }
    }

    onEachFeature(feature, layer) {
        let name, code;
        if (this.props.code.indexOf('GM') === 0) {
            name = feature.properties['WK_NAAM'];
            code = feature.properties['WK_CODE'];
        } else {
            name = feature.properties['BU_NAAM'];
            code = feature.properties['BU_CODE'];
        }
        let docCount = this.props.counts.byCode[code];
        if (!docCount) {
            docCount = 0;
        }

        let tooltip = `
      <h1>${name}</h1>
      <h1>
        <svg width="20" height="20">
          <g><rect fill="none" height="22" width="22" y="-1" x="-1"/></g>
          <g><path stroke="null" id="svg_2" d="m17.376004,5.473698c-0.046716,-0.114196 -0.103814,-0.223201 -0.181675,-0.316634l-4.349818,-4.759885c-0.098624,-0.109005 -0.21801,-0.186866 -0.347778,-0.254345c-0.150531,-0.077861 -0.316634,-0.109005 -0.493118,-0.109005l-8.299952,0c-0.643649,0 -1.178292,0.550216 -1.178292,1.240581l0,17.399273c0,0.695556 0.534644,1.292488 1.178292,1.292488l12.618625,0c0.643649,0 1.152338,-0.596932 1.152338,-1.292488l0,-12.670533c0,-0.186866 -0.025954,-0.368541 -0.098624,-0.529453zm-12.35909,0.487927c0,-0.077861 0.093433,-0.109005 0.176484,-0.109005l3.675025,0c0.083051,0 0.14534,0.031144 0.14534,0.109005l0,0.560597c0,0.07267 -0.057098,0.160912 -0.14534,0.160912l-3.675025,0c-0.083051,0 -0.176484,-0.088242 -0.176484,-0.160912l0,-0.560597zm0,6.644114c0,-0.077861 0.093433,-0.109005 0.176484,-0.109005l6.343052,0c0.083051,0 0.124577,0.031144 0.124577,0.109005l0,0.560597c0,0.07267 -0.036335,0.160912 -0.124577,0.160912l-6.343052,0c-0.083051,0 -0.176484,-0.088242 -0.176484,-0.160912l0,-0.560597zm8.305142,3.882654c0,0.07267 -0.036335,0.160912 -0.124577,0.160912l-8.004081,0c-0.083051,0 -0.176484,-0.088242 -0.176484,-0.160912l0,-0.560597c0,-0.077861 0.093433,-0.109005 0.176484,-0.109005l8.004081,0c0.083051,0 0.124577,0.031144 0.124577,0.109005l0,0.560597zm1.661028,-6.644114c0,0.07267 -0.036335,0.160912 -0.124577,0.160912l-9.665109,0c-0.083051,0 -0.176484,-0.088242 -0.176484,-0.160912l0,-0.560597c0,-0.077861 0.093433,-0.109005 0.176484,-0.109005l9.665109,0c0.083051,0 0.124577,0.031144 0.124577,0.109005l0,0.560597zm-2.434445,-3.939752c-0.29068,0 -0.576169,-0.269917 -0.576169,-0.586551l0,-3.425871l3.695788,4.012422l-3.119619,0z"/></g>
        </svg> ${docCount}
      </h1>
    `;
        layer.setStyle({
            className: classNames('c-feature', {
                active: this.props.code.indexOf('BU') === 0
            }),
            fillOpacity: this.getOpacity(docCount)
        });
        layer.bindTooltip(tooltip, {
            className: 'c-tooltip',
            opacity: 1.0,
            permanent: this.props.code.indexOf('BU') === 0
        });
        layer.on({
            click: this.handleOnClick
        });
    }

    onEachAdjacentFeature(feature, layer) {
        let name;
        if (!!feature.properties['BU_CODE']) {
            name = feature.properties['BU_NAAM'];
        } else if (!!feature.properties['WK_CODE']) {
            name = feature.properties['WK_NAAM'];
        } else if (!!feature.properties['GM_CODE']) {
            name = feature.properties['GM_NAAM'];
        }
        let tooltip = `
      <h1>${name}</h1>
    `;
        layer.setStyle({
            className: 'c-feature adjacent'
        });
        layer.bindTooltip(tooltip, {
            className: 'c-tooltip adjacent',
            opacity: 1.0
        });
        layer.on({
            click: this.handleOnClickAdjacent
        });
    }

    renderSelectedArea() {
        if (Object.keys(this.props.geo).length > 0) {
            return (
                <GeoJSON
                    className={'feature'}
                    ref={node => {
                        this.featureNode = node;
                    }}
                    key={`${hash(this.props.geo)}${Date.now()}`}
                    data={this.props.geo}
                    onEachFeature={this.onEachFeature.bind(this)}
                />
            );
        }
    }

    renderAdjacentArea() {
        if (Object.keys(this.props.adjacent).length > 0) {
            return (
                <GeoJSON
                    className={'feature'}
                    key={`${hash(this.props.adjacent)}${Date.now()}`}
                    data={this.props.adjacent}
                    onEachFeature={this.onEachAdjacentFeature.bind(this)}
                />
            );
        }
    }

    render() {
        let position = [52.08425313826753, 5.082550048828126];
        return (
            <div className="c-map">
                <LeafletMap
                    center={position}
                    zoom={10}
                    zoomControl={false}
                    dragging={false}
                    tap={false}
                    boxZoom={false}
                    scrollWheelZoom={false}
                    touchZoom={false}
                    keyboard={false}
                    worldCopyJump={false}
                    doubleClickZoom={false}
                    attributionControl={false}
                >
                    <TileLayer
                        attribution="Map tiles by <a href=&quot;http://stamen.com&quot;>Stamen Design</a>, <a href=&quot;http://creativecommons.org/licenses/by/3.0&quot;>CC BY 3.0</a> &mdash; Map data &copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a>"
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
                    />
                    {this.renderSelectedArea()}
                    {this.renderAdjacentArea()}
                </LeafletMap>
            </div>
        );
    }
}

NavigableMap.defaultProps = {
    code: '',
    geo: {},
    adjacent: {},
    counts: {
        byCode: {},
        maxCount: 0
    },
    selectArea: undefined,
    openDrawer: undefined
};

export default NavigableMap;
