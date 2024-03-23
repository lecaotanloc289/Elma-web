import axios from "axios";
import { API_PUBLIC_URL } from "../utils/config";
import { setCategories, setProductData, setProducts } from "./actions/actions";

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
