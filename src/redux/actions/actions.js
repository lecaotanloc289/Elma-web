import axios from "axios";
import { toggleFavorite } from "../../utils/appService";
import {
    FETCH_SEARCH_RESULTS_SUCCESS,
    SET_CATEGORIES,
    SET_PRODUCTS,
    SET_PRODUCTS_DATA,
    SET_SEARCH_TERM,
    TOGGLE_LIKE_FAILURE,
    TOGGLE_LIKE_SUCCESS,
} from "./actionTypes";
import { API_PUBLIC_URL } from "../../utils/config";

// GET ALL CATEGORIES
export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
});

// GET ALL PRODUCTS
export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

// FAVORITE PRODUCTS
export const toggleFavoriteAction = async (productId, dispatch) => {
    var userId;
    if (localStorage.getItem("isAuthenticated") === "true") {
        const userData = JSON.parse(localStorage.getItem("userData"));
        userId = userData.id;
    }

    try {
        const result = await toggleFavorite(userId, productId);
        console.log(result);
        dispatch({
            type: TOGGLE_LIKE_SUCCESS,
            payload: result,
        });
    } catch (error) {
        dispatch({
            type: TOGGLE_LIKE_FAILURE,
            payload: error.message,
        });
    }
};

// PRODUCT DETAILS
export const setProductData = (data) => ({
    type: SET_PRODUCTS_DATA,
    payload: data,
});

// SEARCH PRODUCT
export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term,
});

export const fetchSearchResultsSuccess = (results) => ({
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    payload: results,
});

export const fetchSearchResults = (term) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${API_PUBLIC_URL}products/search?key=${term}`,
            );
            const results = response.data;
            dispatch(fetchSearchResultsSuccess(results));
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
};
