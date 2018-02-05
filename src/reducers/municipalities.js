import {
    SET_INITIAL_MUNICIPALITIES,
    FILTER_MUNICIPALITIES,
    CHOOSE_MUNICIPALITY,
    SHOW_USER_LOCATION,
    SHOW_USER_LOCATION_ERROR,
    RESET_USER_LOCATION
} from '../types'

import levenshtein from 'js-levenshtein'
const initialState = {
    all: [], 
    filtered: [],
    term: '', 
    loadingLocation: false,
    loadingLocationError: false,
    location: ''
};

function municipalities(state = initialState, action) {
    switch(action.type) {        
        case SET_INITIAL_MUNICIPALITIES:
            console.log(action)
            return Object.assign({}, state, {all: action.municipalities, filtered: action.municipalities})
        case FILTER_MUNICIPALITIES:
            const {term} = action;
            const filtered = state.all
                .filter(({name}) => {
                    name = name.toLowerCase();
                    return name.indexOf(term) >= 0 || levenshtein(name, term) <= 2
                })
                .sort((a, b) => {
                    if ( a.name < b.name ) { return -1 }
                    if ( a.name > b.name ) { return 1 }
                    return 0
                });
            return Object.assign({}, state, {filtered})
        case CHOOSE_MUNICIPALITY:
            return Object.assign({}, state, {code: action.code})
        case SHOW_USER_LOCATION:
            return Object.assign({}, state, {location: action.location})
        case SHOW_USER_LOCATION_ERROR: 
            return Object.assign({}, state, {loadingLocation: false, loadingLocationError: true})
        case RESET_USER_LOCATION: 
            return Object.assign({}, state, {loadingLocation: false, loadingLocationError: false})
        
        default:
            return state
    }
}

export default municipalities    