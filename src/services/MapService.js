import * as keyBy from 'lodash/keyBy';
import * as mapValues from 'lodash/mapValues';
import * as maxBy from 'lodash/maxBy';
import apiUrl from './ApiUrl'
import LocationService from '../services/LocationService'
import { isMobile } from '../utilities/device'

const MapService = (function() {

  const levels = {
    'GM': 'districts',
    'WK': 'neighborhoods',
    'BU': '',
  }

  function getUserLocation() {
    return LocationService.getCoords()
      .then(coords => getPolygon(coords.latitude, coords.longitude))  //amstelveen test coords 52.308888, 4.873396
      .then(res => isMobile() ? res.properties['BU_CODE'] : res.properties['GM_CODE']);
  }

  function getPolygon(latitude, longitude) {
    let url = `${apiUrl}localize?lat=${latitude}&lon=${longitude}`
    url = isMobile() ? `${url}&type=neighborhood` : `${url}&type=municipality`
    
    return fetch(url).then(res => res.status === 200 ? res.json() : Promise.reject(res));
  }

  function getMunicipalities() {
    return fetch(`${apiUrl}municipal`)
      .then(res => res.json())
      .then(({municipalities}) => municipalities
          .sort((a, b) => {
            if ( a.name < b.name ) { return -1 }
            if ( a.name > b.name ) { return 1 }
            return 0
          }))
      .catch(err => console.log(err));
  }

  function getFeatures(code = '') {
    let url = `${apiUrl}municipal/${code}`
    if ( !!levels[code.slice(0, 2)] ) {
      url += `/${levels[code.slice(0, 2)]}`
    }
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
      })
        .then(d => d.json())
        .then(geo => resolve(geo))
        .catch(err => reject(err))
    })
  }

  function getAdjacentFeatures(code = '') {
    let url = `${apiUrl}municipal/${code}/adjacent`
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
      })
        .then(d => d.json())
        .then(geo => resolve(geo))
        .catch(err => reject(err))
    })
  }

  function getAreaCounts(facets, selectedCode, totalCount) {
    let buckets = [];
    let maxCount = 0;
    let counts = {};

    if (!!selectedCode && !!facets) {
      if (!!facets.districts) {
        buckets = facets.districts.buckets;
      } else if (!!facets.neighborhoods) {
        buckets = facets.neighborhoods.buckets;
      }

      let inArea = buckets;
      if (selectedCode.slice(0,2) === 'WK') {
        // filter counts if a district is selected
        inArea = buckets.filter(function(areaCount){
          return areaCount.key.slice(2,8) === selectedCode.slice(2,8)
        });
      }

      const maxValue = maxBy(inArea, 'doc_count');
      if (!!maxValue) {
        maxCount = maxValue.doc_count;
      }
      counts = mapValues(keyBy(inArea, 'key'), 'doc_count');

      if (selectedCode.slice(0,2) === 'BU') {
        counts[selectedCode] = totalCount;
        maxCount = totalCount;
      }
    }

    return {
      byCode: counts,
      maxCount: maxCount
    }
  }

  return {
    getUserLocation,
    getPolygon,
    getMunicipalities,
    getFeatures,
    getAdjacentFeatures,
    getAreaCounts
  }

}());


export default MapService
