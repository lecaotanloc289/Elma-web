import { Button, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { formattedNumber } from "../../utils/appService";
import { images } from "../../assets/images";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../redux/actions/cartAction";

export function OrderSummary({ handleBack, handleComplete }) {
    const dispatch = useDispatch();
    const products = JSON.parse(localStorage.getItem("selectedProducts"));
    const total = products.reduce((total, product) => {
        return total + product.productId.price * product.quantity;
    }, 0);

    // get user data from store
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData.id;

    // get cart item from store
    const handleRemoveProduct = async (productId) => {
        const product = {
            userId: userId,
            productId: productId,
        };

        const updatedProducts = products.filter(
            (product) => product.productId._id !== productId,
        );

        localStorage.setItem(
            "selectedProducts",
            JSON.stringify(updatedProducts),
        );

        await dispatch(removeFromCart(product));
        dispatch(fetchCart(userId));
    };

    const [discount, setDiscount] = useState(0);

    return (
        <div className="">
            <Stack maxWidth={500} className="mg40" spacing={3}>
                {products.map((item, index) => (
                    <Stack
                        spacing={3}
                        direction={"row"}
                        className="flex-space-between center"
                    >
                        <Stack direction={"row"} spacing={3}>
                            <div
                                style={{ width: "50px", height: "50px" }}
                                className="image-container flex-center"
                            >
                                <img
                                    height={50}
                                    src={item.productId.image}
                                    alt=""
                                />
                            </div>
                            <div>
                                <p className="h8 medium dark-title">
                                    {item.productId.name}
                                </p>
                                <div className="flex-space-between flex-row">
                                    <p className="green h8 regular">
                                        {formattedNumber(item.productId.price)}
                                    </p>
                                </div>
                            </div>
                        </Stack>
                        <Stack direction="row">
                            <div className="flex center">
                                <p
                                    style={{ whiteSpace: "nowrap" }}
                                    className="dark-lighter5a h8 regular"
                                >
                                    {item.quantity > 1
                                        ? `${item.quantity} items `
                                        : `${item.quantity} item`}
                                </p>
                            </div>
                            <IconButton
                                onClick={() =>
                                    handleRemoveProduct(item.productId._id)
                                }
                            >
                                <img width={30} src={icons.Trash_red} alt="" />
                            </IconButton>
                        </Stack>
                    </Stack>
                ))}
                <Stack spacing={2}>
                    <div className="flex-row flex-space-between">
                        <p className="h7 regular dark-lightest95">Subtotal</p>
                        <p className="h7 regular dark-title">
                            {formattedNumber(total)}
                        </p>
                    </div>
                    <div className="flex-row flex-space-between">
                        <p className="h7 regular dark-lightest95">Shipping</p>
                        <p className="h7 regular dark-title">
                            {formattedNumber(0)}
                            {/* {formattedNumber(0.005 * total)} */}
                        </p>
                    </div>
                    <div className="flex-row flex-space-between">
                        <p className="h7 regular dark-lightest95">
                            Discount {discount}%
                        </p>
                        <p className="h7 regular red">
                            {formattedNumber((total * discount) / 100)}
                        </p>
                    </div>
                    <div className="flex-row flex-space-between">
                        <p className="h7 medium dark-title">Order Total</p>
                        <p className="h7 medium dark-title">
                            {formattedNumber(total * (1 - discount / 100))}
                        </p>
                    </div>
                </Stack>
                <Button
                    onClick={handleComplete}
                    variant="contained"
                    className="button-contained"
                >
                    {/* <img src={icons.Shipping_white} alt="" /> */}
                    <p className="normal h7 medium white">Review</p>
                </Button>
                <Button
                    onClick={handleBack}
                    variant="outlined"
                    className="button-outlined"
                >
                    <img src={icons.Arror_left} alt="" />
                </Button>
            </Stack>
        </div>
    );
}
