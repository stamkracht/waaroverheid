import * as isArray from 'lodash/isArray';

export function getQuery(search) {
    const searchParams = new URLSearchParams(search);
    for (let params of searchParams) {
        switch (params[0]) {
            case 'query':
                return params[1];
            default:
                '';
        }
    }
    return '';
}

export function getName(geoResponse, code = '') {
    let prefix = code.slice(0, 2);
    return geoResponse.properties
        ? geoResponse.properties[`${prefix}_NAAM`]
        : geoResponse.features[0].properties[`${prefix}_NAAM`];
}

export function removeFilters(stateFilters, { key, filterName }) {
    const filters = Object.assign({}, stateFilters);
    if (filterName === 'start_date') {
        delete filters.start_date;
    }

    if (filterName === 'classification') {
        filters[filterName].terms = stateFilters[filterName].terms.filter(tag => tag !== key);
        if (!filters[filterName].terms.length) {
            delete filters[filterName];
        }
    }

    return filters;
}

export function mergeDocuments(state, updatedSearch) {
    const search = Object.assign({}, state.search);

    if (isArray(updatedSearch.events)) {
        search.events = search.events.concat(updatedSearch.events);
    }
    search.meta = updatedSearch.meta;

    return search;
}

export function getFiltersFromUrl(search) {
    const searchParams = new URLSearchParams(search);
    let filters = {};
    for (let params of searchParams) {
        switch (params[0]) {
            case 'to':
                filters.start_date = filters.start_date || {};
                filters.start_date.to = params[1];
                break;
            case 'from':
                filters.start_date = filters.start_date || {};
                filters.start_date.from = params[1];
                break;
            case 'classification':
                filters.classification = { terms: [...params[1].split(',')] };
                break;
        }
    }
    return filters;
}

export function getIsDrawerOpen(search) {
    const searchParams = new URLSearchParams(search);
    for (let params of searchParams) {
        switch (params[0]) {
            case 'isDrawerOpen':
                return true;
        }
    }

    return false;
}
