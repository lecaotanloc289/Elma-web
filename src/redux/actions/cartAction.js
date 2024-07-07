import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import {
    ADD_TO_CART,
    DECREASE_QUANTITY_SUCCESS,
    FETCH_DATA_FROM_CART,
    GET_GOSHIP_TOKEN,
    INCREASE_QUANTITY_SUCCESS,
    REMOVE_FROM_CART,
    SET_CUSTOMER_ADDRESS,
    SET_PAYMENT_METHOD,
    SET_SHIPPING_OPTION,
    UPDATE_NOTE,
} from "./actionTypes";
export const fetchCartSuccess = (cartItems) => ({
    type: FETCH_DATA_FROM_CART,
    payload: cartItems,
});

export const addToCartSuccess = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCartSuccess = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const increaseQuantitySuccess = (productId) => ({
    type: INCREASE_QUANTITY_SUCCESS,
    payload: productId,
});

export const decreaseQuantitySuccess = (productId) => ({
    type: DECREASE_QUANTITY_SUCCESS,
    payload: productId,
});

export const setShippingOption = (option) => ({
    type: SET_SHIPPING_OPTION,
    payload: option,
});

export const setPaymentMethod = (method) => ({
    type: SET_PAYMENT_METHOD,
    payload: method,
});

export const updateNote = (note) => ({
    type: UPDATE_NOTE,
    payload: note,
});

export const saveAddress = (address) => ({
    type: SET_CUSTOMER_ADDRESS,
    payload: address,
});

export const saveNote = (note) => {
    return (dispatch) => {
        localStorage.setItem("note", note);
        dispatch(updateNote(note));
    };
};
export const fetchCart = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_PUBLIC_URL}carts/${id}`);
            dispatch(fetchCartSuccess(response.data));
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };
};
export const addToCart = (product) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${API_PUBLIC_URL}carts/add`,
                product,
            );
            if (response.status === 200) {
                dispatch(fetchCart(product.userId));
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };
};

export const removeFromCart = (product) => {
    const userId = product.userId;
    const productId = product.productId;
    const api = `${API_PUBLIC_URL}carts/delete/${userId}/${productId}`;
    return async (dispatch) => {
        try {
            const res = await axios.delete(api);
            if (res.status === 200 || res.status === 204) {
                // dispatch(removeFromCartSuccess(res.data));
                dispatch(fetchCart(userId));
            }
        } catch (error) {
            console.error("Error removing from cart:", error.message);
        }
    };
};

export const increaseQuantity = (product) => {
    // {
    //     "userId": "65c2091dc3e076cc6ae53dc2",
    //     "productId": "65db0b69f08a93058c07f04f"
    // }
    return async (dispatch) => {
        try {
            const response = await axios.put(
                `${API_PUBLIC_URL}carts/increase`,
                product,
            );
            dispatch(increaseQuantitySuccess(response.data));
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };
};

export const decreaseQuantity = (product) => {
    // {
    //     "userId": "65c2091dc3e076cc6ae53dc2",
    //     "productId": "65db0b69f08a93058c07f04f"
    // }
    return async (dispatch) => {
        try {
            const response = await axios.put(
                `${API_PUBLIC_URL}carts/decrease`,
                product,
            );
            dispatch(decreaseQuantitySuccess(response.data));
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };
};

export const handleRemoveProducts = async (userId, productIds) => {
    console.log(typeof productIds);
    try {
        const res = await axios.delete(
            `${API_PUBLIC_URL}carts/delete/${userId}`,
            productIds,
        );
        console.log(res.data);
    } catch (error) {
        console.log("Error remove products from cart: ", error);
    }
};

// GOSHIP TOKEN
export const goshipToken = (token) => ({
    type: GET_GOSHIP_TOKEN,
    payload: token,
});

export const getGoshipToken = async (dispatch) => {
    try {
        const response = await axios.get(`${API_PUBLIC_URL}goship/login`);
        if (response.status === 200) {
            dispatch(goshipToken(response.data));
        }
    } catch (error) {
        console.log(error);
    }
};

export const getGoshipRates = async (token, to, parcel) => {
    const productNumber = parcel?.length;
    const total = parcel?.reduce((total, product) => {
        return total + product.productId.price * product.quantity;
    }, 0);
    // console.log(productNumber, total);
    // token, from, to, parcel
    const data = {
        token: token,
        from: {
            district: 701400,
            city: 700000,
        },
        to: {
            district: to?.district?.id,
            city: to?.city?.id,
        },
        parcel: {
            cod: total,
            amount: total,
            width: productNumber * 10,
            height: productNumber * 10,
            length: productNumber * 10,
            weight: productNumber * 750,
        },
    };
    // console.log(data);
    try {
        const response = await axios.post(
            `${API_PUBLIC_URL}goship/rates`,
            data,
        );
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getCities = async (token) => {
    try {
        const response = await axios.post(`${API_PUBLIC_URL}goship/cities`, {
            token,
        });
        if (response.status === 200) {
            return response?.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getDistricts = async (cityCode, token) => {
    try {
        const response = await axios.post(`${API_PUBLIC_URL}goship/districts`, {
            cityCode,
            token,
        });
        if (response.status === 200) {
            return response?.data;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};
