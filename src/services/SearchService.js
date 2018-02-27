import apiUrl from './ApiUrl';

let PARAMS = {
    from: 0,
    size: 2,
    facets: {
        types: {},
        start_date: {
            interval: 'month'
        },
        classification: {
            size: 100
        }
    },
    sort: 'start_date',
    order: 'desc',
    query: ''
};

export function search(code, query = '', filters = {}, page = 1) {
    return fetch(`${apiUrl}v0/${parseCode(code)}/search`, {
        method: 'POST',
        body: JSON.stringify(handleData(code, query, page, filters)),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        }
        return Promise.reject(res);
    });
}

function parseCode(code) {
    const level = code.slice(0, 2).toLowerCase();

    switch (level) {
        case 'gm':
            return code.toLowerCase();
        case 'wk':
        case 'bu':
            return `gm${code.slice(2, 6)}`;
        default:
            return code.toLowerCase();
    }
}

function getAreaFilter(code) {
    const level = code.slice(0, 2).toLowerCase();

    switch (level) {
        case 'wk':
            return { districts: { terms: [code] } };
        case 'bu':
            return { neighborhoods: { terms: [code] } };
        default:
            return {};
    }
}

function getAreaFacet(code) {
    const level = code.slice(0, 2).toLowerCase();

    switch (level) {
        case 'gm':
            return { districts: { size: 100 } };
        case 'wk':
            return { neighborhoods: { size: 500 } };
        default:
            return {};
    }
}

function getPage(page) {
    switch (page) {
        case 1:
            PARAMS.from = 0;
            PARAMS.size = 2;
            break;
        case 2:
            PARAMS.from = 2;
            PARAMS.size = 3;
            break;
        default:
            PARAMS.from += PARAMS.size;
            PARAMS.size = 5;
            break;
    }
    return [PARAMS.from, PARAMS.size];
}

function getSearchFilters(filters) {
    return Object.keys(filters)
        .filter(name => {
            if (name === 'classification') {
                return filters[name] && filters[name].terms.length;
            }
            return filters[name];
        })
        .reduce((memo, name) => {
            const filter = {};
            filter[name] = filters[name];
            return Object.assign(memo, filter);
        }, {});
}

function handleData(code, query, page, filters) {
    const params = Object.assign({}, PARAMS);
    const areaFilter = getAreaFilter(code);
    const areaFacet = getAreaFacet(code);
    const searchFilters = getSearchFilters(filters);
    [params.from, params.size] = getPage(page);
    params.query = query;

    //change sort order based on presence of query
    if (query) {
        params.sort = '_score';
    }

    if (page <= 1) {
        // add districts or neighborhood facet on initial search
        params.facets = Object.assign({}, params.facets, areaFacet);
    } else {
        // no need for facets on subsequent pages
        delete params.facets;
    }
    params.filters = Object.assign({}, areaFilter, searchFilters);
    return params;
}

export function setParams(params) {
    PARAMS = Object.assign(PARAMS, params);
}

export function subscribeForAlert(email, code, query, filters) {
    const docIndex = `wo_${parseCode(code)}`;
    const queryPayload = handleData(code, query, 1, filters);
    const payload = {
        email: email,
        doc_index: docIndex,
        query: queryPayload,
        url: `${window.location.pathname}${window.location.search}`
    };

    return fetch(`${apiUrl}v0/subscription`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => {
        if (res.status in [200, 201]) {
            return res.status;
        }
        return Promise.reject(res);
    });
}
