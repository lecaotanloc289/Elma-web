import { IconButton, Stack } from "@mui/material";
import React from "react";
import { formattedNumber } from "../../utils/appService";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../redux/actions/cartAction";

export default function Summary() {
    const dispatch = useDispatch();
    const products = JSON.parse(localStorage.getItem("selectedProducts"));
    const selectedShippingOption = useSelector(
        (state) => state.shippingPayment.selectedShippingOption,
    );
    let total = products.reduce((total, product) => {
        return total + product.productId.price * product.quantity;
    }, 0);

    
    // if (selectedShippingOption) total += selectedShippingOption?.total_fee;
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

    const discount = 0;

    return (
        <div className="">
            <p className="h5 medium dark-title">Order summary</p>
            <p className="h8 regular dark-lightest95 mg10">
                View your order items.
            </p>
            <Stack maxWidth={500} spacing={3}>
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
                            {selectedShippingOption
                                ? formattedNumber(
                                      selectedShippingOption?.total_fee,
                                  )
                                : formattedNumber(0)}
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
            </Stack>
        </div>
    );
}
