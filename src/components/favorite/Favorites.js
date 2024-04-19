import React, { useEffect, useState } from "react";
import MainLayout from "../MainLayout";
import { InProgramingProgress } from "../items/InProgramingProgress";
import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, IconButton, Stack } from "@mui/material";
import { formattedNumber } from "../../utils/appService";
import icons from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Visibility } from "@mui/icons-material";
import { addToCart } from "../../redux/actions/cartAction";
import { message } from "antd";
import { favoriteProduct, fetchUserData } from "../../redux/thunk";

export default function Favorites() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userData).id;
    if (userId === undefined) navigate("/signin");
    const [favoriteProducts, setFavoriteProducts] = useState(null);
    const products = useSelector((state) => state.data.products);
    useEffect(() => {
        const getUserFavoriteProduct = async () => {
            try {
                const res = await axios.get(`${API_PUBLIC_URL}users/${userId}`);
                if (res.status === 200) {
                    const favorite = products.filter((item) =>
                        res.data.likedProducts.includes(item._id),
                    );
                    setFavoriteProducts(favorite);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUserFavoriteProduct();
    }, [products, userId]);
    const handleAddToCart = (productId) => {
        if (userId !== undefined) {
            const product = {
                userId: userId,
                productId: productId,
                quantity: 1,
            };
            dispatch(addToCart(product));
            message.success("Add to cart success!");
        } else {
            window.location.href = "/signin";
        }
    };
    const handleFavorite = (productId) => {
        if (userId !== undefined) {
            favoriteProduct(userId, productId);
            fetchUserData(userId);
        } else navigate("/signin");
    };
    return (
        <MainLayout>
            <Container style={{ margin: "40px auto" }} maxWidth="lg">
                <Stack
                    direction={"row"}
                    className="flex-space-between center mg20"
                >
                    <div>
                        <p className="h2 medium dark-title ">
                            Favorite products
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/")}
                        className="button-outlined"
                        variant="outlined"
                    >
                        <img height={20} src={icons.Home} alt="" />
                        <p className="normal h7 medium indigo">
                            Go to Homepage
                        </p>
                    </Button>
                </Stack>
                {favoriteProducts !== null ? (
                    favoriteProducts.map((i) => {
                        return (
                            <Container maxWidth="lg">
                                <Stack
                                    direction={"row"}
                                    container
                                    spacing={4}
                                    className="flex-center center"
                                >
                                    <div className="image-container center">
                                        <img
                                            width={120}
                                            className="product-image"
                                            src={i.image}
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <p className="h7 medium dark-title">
                                            {i.name}
                                        </p>
                                        <p className="h8 regular dark-lightest95">
                                            {i.brand}
                                        </p>
                                    </div>
                                    <p
                                        style={{ lineHeight: "32px" }}
                                        className="h7 medium green product-price"
                                    >
                                        {formattedNumber(i.price)}
                                    </p>

                                    <IconButton
                                        onClick={() => {
                                            handleFavorite(i._id);
                                        }}
                                        className="delete-product"
                                    >
                                        <img src={icons.Trash} alt="" />
                                    </IconButton>
                                    <Button
                                        className="btn "
                                        variant="outlined"
                                        onClick={() =>
                                            navigate(
                                                `/productdetails?id=${i._id}`,
                                            )
                                        }
                                    >
                                        <p className="normal h7 medium indigo ">
                                            <Visibility
                                                style={{
                                                    width: 15,
                                                    marginRight: 4,
                                                    marginBottom: -4,
                                                }}
                                                className="icon"
                                            />
                                            View detail
                                        </p>
                                    </Button>
                                    <Button
                                        className="btn btn1 primary-background"
                                        variant="contained"
                                        onClick={() => handleAddToCart(i._id)}
                                    >
                                        <p className=" normal h7 medium white center">
                                            <ShoppingCart
                                                style={{
                                                    width: 15,
                                                    marginRight: 4,
                                                    marginBottom: -4,
                                                }}
                                                className="icon"
                                            />
                                            Add to cart
                                        </p>
                                    </Button>
                                </Stack>
                            </Container>
                        );
                    })
                ) : (
                    <>
                        <InProgramingProgress />
                    </>
                )}
            </Container>
        </MainLayout>
    );
}
