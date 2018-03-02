import React from 'react';
import Alert from './Alert';
import NavigableMap from './NavigableMap';
import Drawer from './Drawer';
import ZoomControls from './ZoomControls';
import Filters from './Filters';
import * as MapService from '../services/MapService';
class Map extends React.Component {
    componentWillMount() {
        this.props.initializeMap(this.props.location, this.props.match.params, this.props.history);
    }

    componentDidUpdate(newProps) {
        if (
            newProps.location.pathname !== this.props.location.pathname ||
            newProps.location.search !== this.props.location.search
        ) {
            this.props.initializeMap(this.props.location, this.props.match.params, this.props.history);
        }
    }

    componentWillUnmount() {
        this.props.resetArea();
    }

    render() {
        const {
            geo,
            adjacent,
            code,
            counts,
            getSearch,
            getArea,
            facets,
            filters,
            documents,
            hasMoreDocs,
            isDrawerOpen,
            documentsCount,
            toggleDrawer,
            changePage,
            name,
            history,
            query,
            resetQuery,
            updateFilters,
            updateQuery,
            getMoreDocuments,
            resetFilters,
            removeFilters,
            getMoreDocs,
            resetArea,
            fetchFailed,
            getAdjacentArea,
            searchFailed,
            submitAlert,
            email,
            emailFailed,
            isModalOpen,
            toggleModal,
            submitFlag,
            flagFailed,
            location: { search }
        } = this.props;

        return (
            <div>
                <NavigableMap
                    geo={geo}
                    adjacent={adjacent}
                    code={code}
                    counts={counts}
                    selectArea={getArea}
                    selectAdjacentArea={getAdjacentArea}
                    isDrawerOpen={isDrawerOpen}
                    toggleDrawer={toggleDrawer}
                />

                {!isDrawerOpen && (
                    <ZoomControls
                        code={code}
                        setZoomLevel={code => getArea({ code })}
                        goToMunicipalities={resetArea}
                        search={search}
                        fetchFailed={fetchFailed}
                    />
                )}
                {!isDrawerOpen &&
                    !fetchFailed && (
                        <Filters
                            facets={facets}
                            filters={filters}
                            updateFilters={updateFilters}
                            removeFilters={(key, filterName) => removeFilters({ key, filterName })}
                            updateQuery={updateQuery}
                            submit={getSearch}
                            resetFilters={resetFilters}
                            areFiltersDefined={search}
                        />
                    )}

                <Alert
                    area={name}
                    code={code}
                    filters={filters['classification'] || {}}
                    removeFilters={(key, filterName) => removeFilters({ key, filterName })}
                    query={query}
                    resetQuery={() => updateQuery('')}
                    submit={submitAlert}
                    email={email}
                    emailFailed={emailFailed}
                    isModalOpen={isModalOpen}
                    toggleModal={isModalOpen => toggleModal(isModalOpen)}
                />

                <Drawer
                    documentsCount={documentsCount}
                    area={name}
                    isDrawerOpen={isDrawerOpen}
                    toggleDrawer={isDrawerOpen => toggleDrawer(isDrawerOpen)}
                    service={this.DocumentService}
                    facets={facets}
                    documents={documents}
                    filters={filters}
                    removeFilters={(key, filterName) => removeFilters({ key, filterName })}
                    query={query}
                    resetArea={resetArea}
                    searchFailed={searchFailed}
                    fetchFailed={fetchFailed}
                    resetQuery={() => updateQuery('')}
                    getMoreDocuments={page => getMoreDocs({ page })}
                    hasMoreDocs={hasMoreDocs}
                    submitFeedback={submitFlag}
                    flagFailed={flagFailed}
                />
            </div>
        );
    }
}

export default Map;
