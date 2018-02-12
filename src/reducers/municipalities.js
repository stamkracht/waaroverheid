import * as TYPES from '../types';

import levenshtein from 'js-levenshtein';
const initialState = {
    all: [],
    filtered: [],
    term: '',
    code: '',
    loadingLocation: false
};

function municipalities(state = initialState, action) {
    switch (action.type) {
        case TYPES.SET_INITIAL_MUNICIPALITIES:
            return Object.assign({}, state, { all: action.municipalities, filtered: action.municipalities });
        case TYPES.FILTER_MUNICIPALITIES:
            const { term } = action;
            const filtered = state.all
                .filter(({ name }) => {
                    name = name.toLowerCase();
                    return name.indexOf(term) >= 0 || levenshtein(name, term) <= 2;
                })
                .sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
            return Object.assign({}, state, { filtered });
        case TYPES.CHOOSE_MUNICIPALITY:
            return {
                ...state,
                code: action.code
            };
        case TYPES.SHOW_USER_LOCATION:
            return {
                ...state,
                loadingLocation: true
            };
        case TYPES.RESET_LOCATION:
            return {
                ...state,
                loadingLocation: false
            };
        default:
            return state;
    }
}

export default municipalities;
