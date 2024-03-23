import React, { useEffect } from "react";
import Footer from "./footer/footer";
import Header from "./header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/thunk";
import { fetchCart } from "../redux/actions/cartAction";

export default function MainLayout({ children }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData.id;
    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchCart(userId));
    }, [dispatch, userId]);
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}
