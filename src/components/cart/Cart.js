import { ChevronLeftRounded } from "@mui/icons-material";
import { Button, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import "./Cart.scss";
import MainLayout from "../MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartRoute } from "./CartRoute";
import { images } from "../../assets/images";
import {
    getGoshipToken,
    saveNote,
    updateNote,
} from "../../redux/actions/cartAction";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    getGoshipToken(dispatch);

    // FOR CART BODY
    const cart = useSelector((state) => state.cart);

    // FOR CART
    let quantity;
    if (cart && cart.products) {
        quantity = cart.products.length;
    }
    if (!quantity) {
        dispatch(updateNote(""));
        dispatch(saveNote(""));
    }

    return (
        <MainLayout>
            <div
                style={{ height: 350, marginBottom: -350 }}
                className="white-fill-lighter"
            ></div>
            {quantity > 0 ? (
                <Container maxWidth="lg">
                    <CartHeader />
                    <CartRoute />
                </Container>
            ) : (
                <Stack spacing={2} className="center mg40">
                    <img width={500} src={images.EmptyCart} alt="" />
                    <p
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}
                        className="h3 medium dark-title"
                    >
                        Let's shopping with Elma!
                    </p>
                </Stack>
            )}
        </MainLayout>
    );
}

export function CartHeader() {
    const navigate = useNavigate();
    return (
        <Stack
            direction={"row"}
            className="flex-space-between center cartHeader"
        >
            <div>
                <p className="h2 medium dark-title ">Shopping Cart</p>
                <p className="h7 regular dark-lightest95 mgt4">
                    This is your cart based on your item you want to buy..
                </p>
            </div>
            <Button
                className="button-outlined"
                startIcon={<ChevronLeftRounded />}
                variant="outlined"
                onClick={() => navigate("/")}
            >
                <p className="normal h7 medium indigo">Back to shopping</p>
            </Button>
        </Stack>
    );
}
