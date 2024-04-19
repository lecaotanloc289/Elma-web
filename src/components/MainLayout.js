import React, { useEffect } from "react";
import Footer from "./footer/footer";
import Header from "./header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/thunk";
import { fetchCart } from "../redux/actions/cartAction";
import axios from "axios";
import { API_PUBLIC_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData?.id;

    useEffect(() => {
        dispatch(fetchData());
        if (userId !== undefined) dispatch(fetchCart(userId));
    }, [dispatch, userId]);

    const products = useSelector((state) => state.data.products);

    useEffect(() => {
        const getUserFavoriteProduct = async () => {
            if (userId !== undefined) {
                try {
                    const res = await axios.get(
                        `${API_PUBLIC_URL}users/${userId}`,
                    );
                    if (res.status === 200) {
                        const favorite = products.filter((item) =>
                            res.data.likedProducts.includes(item._id),
                        );
                        localStorage.setItem("favorite", favorite?.length);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getUserFavoriteProduct();
    }, [products, userId]);

    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
