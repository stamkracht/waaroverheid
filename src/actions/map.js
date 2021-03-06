import { all, call, put, select, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { delay, throttle } from 'redux-saga';
import * as TYPES from '../types';
import * as MapService from '../services/MapService';
import * as Search from '../services/SearchService';
import * as RoutingService from '../services/RoutingService';
import { SET_FILTERS_FROM_URL, FETCH_AREA, SELECT_AREA, SET_CODE } from '../types';

export const initializeMap = (location, params, history) => ({
    type: TYPES.FETCH_INITIAL_LOCATION,
    location,
    params,
    history
});

export const setFiltersfromURL = (search, params) => ({
    type: TYPES.SET_FILTERS_FROM_URL,
    search,
    params
});

export const getAdjacentArea = ({ code }) => ({
    type: TYPES.FETCH_AREA,
    code
});

export const getArea = ({ code }) => ({
    type: TYPES.FETCH_AREA,
    code
});

export const getSearch = () => ({
    type: TYPES.FETCH_SEARCH
});

export const updateFilters = filters => ({
    type: TYPES.UPDATE_FILTERS,
    filters
});

export const resetQuery = () => ({
    type: TYPES.FETCH_UPDATE_QUERY,
    query: ''
});

export const updateQuery = query => ({
    type: TYPES.UPDATE_QUERY,
    query
});

export const resetFilters = () => ({
    type: TYPES.FETCH_RESET_FILTERS
});

export const removeFilters = filters => ({
    type: TYPES.FETCH_REMOVE_FILTERS,
    filters
});

export const toggleDrawer = isDrawerOpen => ({
    type: TYPES.FETCH_TOGGLE_DRAWER,
    isDrawerOpen
});

export const toggleModal = isModalOpen => ({
    type: TYPES.TOGGLE_MODAL,
    isModalOpen
});

export const getMoreDocs = ({ code, query, filters, page }) => ({
    type: TYPES.FETCH_MORE_DOCS,
    code,
    query,
    filters,
    page
});

export const setCode = code => ({
    type: TYPES.SET_CODE,
    code
});

export const resetArea = () => ({
    type: TYPES.FETCH_RESET_AREA
});

export const submitAlert = email => ({
    type: TYPES.POST_ALERT_SUBSCRIPTION,
    email
});

export const submitFlag = (resultId, resultType, flags, comment) => ({
    type: TYPES.POST_USER_FEEDBACK,
    resultId,
    resultType,
    flags,
    comment
});

export const getMap = store => store.map;

export function* fetchResetArea() {
    try {
        yield put({ type: TYPES.RESET_AREA });
        yield call(push, '');
    } catch (e) {
        //handle failed
        console.log(e);
    }
}

export function* fetchToggleDrawer(action) {
    try {
        yield put({ type: TYPES.TOGGLE_DRAWER, isDrawerOpen: action.isDrawerOpen });
        const { code, filters, query, history, isDrawerOpen } = yield select(getMap);
        yield call(RoutingService.handleRouting, code, filters, isDrawerOpen, query, history);
    } catch (e) {
        //handle faled
        console.log(e, 'failed');
    }
}

export function* fetchUpdateQuery({ query }) {
    try {
        yield put({ type: TYPES.UPDATE_QUERY, query });
        yield put({ type: TYPES.FETCH_SEARCH });
    } catch (e) {
        //handle faled
        console.log(e, 'failed');
    }
}

export function* fetchRemoveFilters({ filters }) {
    try {
        yield put({ type: TYPES.REMOVE_FILTERS, filters });
        yield put({ type: TYPES.FETCH_SEARCH });
    } catch (e) {
        //handle faled
        console.log(e, 'failed');
    }
}

export function* fetchArea({ code, oldCode }) {
    try {
        const { filters, query, isDrawerOpen, history } = yield select(getMap);
        const [geo, adjacent] = yield all([
            yield call(MapService.getFeatures, code),
            yield call(MapService.getAdjacentFeatures, code)
        ]);
        yield put({ type: TYPES.SELECT_AREA, geo, adjacent, code });
        yield call(RoutingService.handleRouting, code, filters, isDrawerOpen, query, history);
    } catch (e) {
        yield put({ type: TYPES.FETCH_AREA_FAILED });
    }
}

export function* fetchSearch() {
    try {
        const { code, filters, query, isDrawerOpen, history } = yield select(getMap);
        const search = yield call(Search.search, code, query, filters);
        if (search) {
            const counts = yield call(MapService.getAreaCounts, search.facets, code, search.meta.total);
            yield call(RoutingService.handleRouting, code, filters, isDrawerOpen, query, history);
            yield put({ type: TYPES.SEARCH, search, counts });
        }
    } catch (e) {
        yield put({ type: TYPES.FETCH_SEARCH_FAILED });
    }
}

export function* fetchMoreDocs({ page }) {
    try {
        const { code, filters, query } = yield select(getMap);
        const search = yield call(Search.search, code, query, filters, page);
        yield put({ type: TYPES.GET_MORE_DOCS, search, page });
    } catch (e) {
        //handle failed
        console.log(e, 'failed');
    }
}

export function* fetchResetFilters() {
    try {
        yield put({ type: TYPES.RESET_FILTERS });
        const { filters, code } = yield select(getMap);
        yield put({ type: TYPES.FETCH_SEARCH, code, filters });
    } catch (e) {
        //handle failed
        console.log(e, 'failed');
    }
}

export function* fetchInitialLocation({ location, history, params }) {
    try {
        const { code } = params;
        yield put({ type: SET_FILTERS_FROM_URL, search: location.search, params, history });
        yield all([yield call(fetchArea, { code }), yield call(fetchSearch)]);
    } catch (e) {
        yield put({ type: TYPES.FETCH_INITIAL_LOCATION_FAILED });
    }
}

export function* postAlertSubscription({ email }) {
    try {
        const { code, filters, query, name } = yield select(getMap);
        yield call(Search.subscribeForAlert, email, code, query, filters, name);
        yield put({ type: TYPES.SUBMIT_ALERT, email });
    } catch (e) {
        //handle failed
        yield put({ type: TYPES.POST_ALERT_SUBSCRIPTION_FAILED });
    }
}

export function* postUserFeedback({ resultId, resultType, flags, comment }) {
    try {
        const { code, filters, query, page } = yield select(getMap);
        yield call(Search.submitUserFeedback, resultId, resultType, flags, comment, code, query, page, filters);
        yield put({ type: TYPES.USER_FEEDBACK_SAVED });
    } catch (e) {
        //handle failed
        yield put({ type: TYPES.USER_FEEDBACK_POST_FAILED });
        console.log(e, 'Submit flag failed');
    }
}
