import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    setFiltersfromURL,
    getArea,
    getSearch,
    updateFilters,
    updateQuery,
    removeFilters,
    toggleDrawer,
    getMoreDocs,
    setCode,
    resetArea,
    resetFilters,
    initializeMap,
    resetQuery,
    getAdjacentArea,
    submitAlert,
    toggleModal,
    submitFlag
} from '../actions/map';
import Map from '../components/Map';

const mapStateToProps = state => {
    const {
        geo,
        adjacent,
        code,
        hasMoreDocs,
        counts,
        filters,
        name,
        query,
        isDrawerOpen,
        fetchFailed,
        searchFailed,
        email,
        emailFailed,
        isModalOpen,
        flagFailed
    } = state.map;
    const { facets, meta: { total: documentsCount } = 0, events: documents = [] } = state.map.search;
    console.log('Current State -> ', state);
    return {
        geo,
        adjacent,
        code,
        facets,
        documentsCount,
        documents,
        hasMoreDocs,
        counts,
        filters,
        name,
        query,
        isDrawerOpen,
        fetchFailed,
        searchFailed,
        email,
        emailFailed,
        isModalOpen,
        flagFailed
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changePage: code => push(`/${code}`),
            setFiltersfromURL,
            getArea,
            getSearch,
            updateFilters,
            updateQuery,
            removeFilters,
            toggleDrawer,
            getMoreDocs,
            setCode,
            resetArea,
            resetFilters,
            initializeMap,
            resetQuery,
            getAdjacentArea,
            submitAlert,
            toggleModal,
            submitFlag
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Map);
