import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import Benefit from "./Benefit/Benefit";
import Bestseller from "./Bestseller/Bestseller";
import Flashsale from "./Flashsale/Flashsale";
import Category from "./Category/Category";
import Productlist from "./Productlist/Productlist";
import Blog from "./Blog/Blog";
import Brand from "./Brand/Brand";
import MainLayout from "../MainLayout";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <MainLayout>
            <Banner />
            <Benefit />
            <Bestseller />
            <Flashsale />
            <Category />
            <Productlist />
            <Blog />
            <Brand />
        </MainLayout>
    );
};

export default Home;
