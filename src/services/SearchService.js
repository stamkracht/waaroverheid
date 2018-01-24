import apiUrl from './ApiUrl';
import FilterService from './FiltersService';

const SearchService = (function () {

  let PARAMS = {
    from: 0,
    size: 2,
    facets: {
        types: {},
        start_date: {
            interval: 'year'
        },
        classification: {
            size: 100
        },
        districts: {
            size: 100
        }
    },
    sort: '_score',
    order: 'desc',
    query: 'overlast',
    filters: {}
  };

  function search(code) {
    return fetch(`${apiUrl}v0/${parseCode(code)}/search`, {
      method: 'POST',
      body: handleData(code),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json());
  }

  function parseCode(code) {
    const level = code.slice(0,2).toLowerCase();

    switch(level) {
      case 'gm': 
        return code.toLowerCase();
      case 'wk':
      case 'bu':
        return `gm${code.slice(2,6)}`;
      default:
      return code.toLowerCase();
    }
  }

  function getLevelCode(code) {
    const level = code.slice(0,2).toLowerCase();
    
    switch(level) {
      case 'wk':
        return {districts: {terms: [code]}}; 
      case 'bu': 
        return {neighborhoods: {terms: [code]}};    
      default: 
        delete PARAMS.filters.districts;
        delete PARAMS.filters.neighborhoods;
        return {};
    }
  }

  function handleData(code) {
    const levels = getLevelCode(code); 

    PARAMS.filters = Object.assign(PARAMS.filters, levels, FilterService.get());

    return JSON.stringify(PARAMS);
  }

  function setParams(params) {
    PARAMS = Object.assign(PARAMS, params);
  }


  return {
    search,
    setParams
  }

}());

export default SearchService
