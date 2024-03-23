import {
    FETCH_SEARCH_RESULTS_SUCCESS,
    SET_CATEGORIES,
    SET_PRODUCTS,
    SET_SEARCH_TERM,
    TOGGLE_LIKE_FAILURE,
    TOGGLE_LIKE_SUCCESS,
} from "../actions/actionTypes";

// CATEGORIES & PRODUCTS
const initialState = {
    categories: [],
    products: [],
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES: {
            return { ...state, categories: action.payload };
        }
        case SET_PRODUCTS:
            return { ...state, products: action.payload };

        default:
            return state;
    }
};

// FAVORITE BUTTON
const initialFavoriteState = {
    products: {},
    error: null,
};
const favoriteReducer = (state = initialFavoriteState, action) => {
    switch (action.type) {
        case TOGGLE_LIKE_SUCCESS:
            return {
                ...state,
                isFavorite: !state.isFavorite,
                error: null,
            };

        case TOGGLE_LIKE_FAILURE:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

// SEARCH PRODUCTS
const initialStateSearch = {
    searchTerm: "",
    searchResults: [],
};

const searchReducer = (state = initialStateSearch, action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return { ...state, searchResults: action.payload };
        default:
            return state;
    }
};

export { dataReducer, favoriteReducer, searchReducer };
