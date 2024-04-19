import axios from "axios";
import { API_PUBLIC_URL } from "../utils/config";
import { setCategories, setProductData, setProducts } from "./actions/actions";
import { message } from "antd";
import { loginSuccess } from "./actions/signInAction";

export const fetchData = () => async (dispatch) => {
    try {
        const categories = await axios.get(`${API_PUBLIC_URL}categories`);
        const products = await axios.get(`${API_PUBLIC_URL}products`);
        dispatch(setCategories(categories.data));
        dispatch(setProducts(products.data));
    } catch (error) {
        console.log("Error fetching data: ", error);
    }
};

export const fetchProductDetail = () => async (productId, dispatch) => {
    try {
        const res = await axios.get(`${API_PUBLIC_URL}products/${productId}`);
        dispatch(setProductData(res.data));
    } catch (error) {
        console.log("Error fetching product data ", error);
    }
};

export const favoriteProduct = async (userId, productId) => {
    try {
        const res = await axios.put(
            `${API_PUBLIC_URL}users/favorite/${userId}/${productId}`,
        );
        if (res.status === 200) {
            message.info(res.data.message);
        } else {
            console.log("Error favorite || unfavorite products");
        }
    } catch (error) {
        console.log("Call API error");
    }
};

export const fetchUserData = async (userId, dispatch) => {
    try {
        const res = await axios.get(`${API_PUBLIC_URL}users/${userId}`);
        if (res.status === 200) {
            dispatch(loginSuccess(res.data));
        } else {
            console.log("Call API ok but error");
        }
    } catch (error) {
        console.log(error);
    }
};
