function getSearchParams(filters, isDrawerOpen, query) {
    const searchParams = new URLSearchParams();
    Object.keys(filters)
        .filter(filter => filter !== 'types' && filters[filter])
        .forEach(filter => {
            if (filter === 'classification') {
                searchParams.append(filter, filters[filter].terms);
            }
            if (filter === 'start_date') {
                searchParams.append('from', filters[filter].from);
                searchParams.append('to', filters[filter].to);
            }
        });

    if (isDrawerOpen) {
        searchParams.append('isDrawerOpen', true);
    }

    if (query) {
        searchParams.append('query', query);
    }

    return searchParams.toString();
}

function getUrl(code, filters, isDrawerOpen, query) {
    let url = `/${code}`;
    const searchParams = getSearchParams(filters, isDrawerOpen, query);
    return searchParams ? `${url}?${searchParams}` : url;
}

export function handleRouting(code, filters, isDrawerOpen, query, history) {
    let url = getUrl(code, filters, isDrawerOpen, query);
    history.push(url);
}
