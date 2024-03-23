import React, { useEffect, useState } from "react";
import CardProduct from "./CardProduct/CardProduct";
import TabProduct from "./TabProduct/TabProduct";
import Descriptions from "./Descriptions/Descriptions";
import Review from "./Review/Review";
import Comment from "./Comment/Comment";
import RealatedProduct from "./RealatedProduct/RealatedProduct";
import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import { Container, Skeleton } from "@mui/material";
import MainLayout from "../MainLayout";
import queryString from "query-string";

const ProductDetail = () => {
    let id = queryString.parse(window.location.search);
    let idProduct = id.id;
    const [data, setProductData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getProductDetail = async (idProduct) => {
            try {
                const res = await axios.get(
                    `${API_PUBLIC_URL}products/${idProduct}`,
                );
                setProductData(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        getProductDetail(idProduct);
    }, [idProduct]);
    // const data = productData;

    return (
        <MainLayout>
            {data ? (
                <div>
                    <CardProduct data={data} />
                    <TabProduct />
                    <Descriptions data={data} />
                    <Review data={data} />
                    <Comment />
                    <RealatedProduct data={data} />
                </div>
            ) : (
                <Container maxWidth="lg" className="center">
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                    <Skeleton
                        className="mg20"
                        variant="rounded"
                        animation="pulse"
                        width={1130}
                    />
                </Container>
            )}
        </MainLayout>
    );
};

export default ProductDetail;
