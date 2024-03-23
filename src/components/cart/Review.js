import React, { useEffect, useState } from "react";
import logo from "../../assets/logo";
import {
    Avatar,
    Button,
    Container,
    FormControl,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import {
    fetchCart,
    saveNote,
    setPaymentMethod,
    setShippingOption,
    updateNote,
} from "../../redux/actions/cartAction";
import Summary from "./Sumary";
import { message } from "antd";
export default function Review({ handleBack, allStepCompleted, handleNext }) {
    const dispatch = useDispatch();
    // USER DATA
    const userData = useSelector((state) => state.auth.userData);
    // PRODUCT IN CART
    const products = JSON.parse(localStorage.getItem("selectedProducts"));
    // SHIPPING METHOD
    const shipping = useSelector(
        (state) => state.shippingPayment.selectedShippingOption,
    );
    // PAYMENT METHOD
    const payment = useSelector(
        (state) => state.shippingPayment.selectedPaymentMethod,
    );
    // NOTE FOR THIS ORDER
    const note = useSelector((state) => state.notes.note);
    // CUSTOMER INFO AFTER CHANGE
    const customerInfo = useSelector((state) => state.notes.address);
    let userId;
    if (userData) userId = userData.id;
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    // LIST ORDER ITEMS
    const orderItems = products.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
    }));
    // LIST PRODUCTS ID TO REMOVE AFTER CREATE ORDER
    const productIds = orderItems.map((item) => item.product);

    // HANDLE SELECT PAYMENT METHOD OPTION AND CONFIRM ORDER
    const [method, setMethod] = useState(-1);
    const handleOptionPaymentChange = (method) => {
        setMethod(method);
    };
    // HANDLE CONFIRM ORDER WITH COD PAYMENT METHOD
    const handleConfirmOrder = async () => {
        const newOrder = {
            orderItems: orderItems,
            shippingAddress1:
                "Học viện Hàng không Việt Nam - 18A/1 phường 4 quận Tân Bình",
            shippingAddress2: userData.street,
            city: userData.city,
            zip: userData.zip,
            country: userData.country,
            phone: userData.phone,
            status: "Pending",
            user: userData.id,
            shipping: shipping,
            payment: payment,
            note: note,
            dateOrdered: Date.now,
        };
        try {
            const res = await axios.post(`${API_PUBLIC_URL}orders`, newOrder);
            const order = res.data;
            // console.log("Order createed: ", order);
            localStorage.setItem("newOrder", order._id);

            // handle remove products in cart
            try {
                const res = await axios.post(
                    `${API_PUBLIC_URL}carts/delete/${userId}`,
                    productIds,
                );
                const updatedProducts = products.filter(
                    (item) =>
                        !productIds.includes(item.productId._id.toHexString()),
                );

                localStorage.setItem(
                    "selectedProducts",
                    JSON.stringify(updatedProducts),
                );
                console.log(res.data);
            } catch (error) {
                console.log("Error remove products from cart: ", error);
            }
            dispatch(fetchCart(userId));

            // handle reload note
            dispatch(updateNote(""));
            dispatch(saveNote(""));

            // handle reload shipping option
            dispatch(setShippingOption(""));
            // handle reload payment method
            dispatch(setPaymentMethod(""));
            window.location.href = "/ordersuccessful";
            return order._id;
        } catch (error) {
            console.error("Error creating order:", error.message);
        }
    };
    // const handleRemoveProduct = async (productId) => {
    //     const product = {
    //         userId: userId,
    //         productId: productId,
    //     };

    //     const updatedProducts = products.filter(
    //         (product) => product.productId._id !== productId,
    //     );

    //     localStorage.setItem(
    //         "selectedProducts",
    //         JSON.stringify(updatedProducts),
    //     );

    //     await dispatch(removeFromCart(product));
    // };
    const total = products.reduce((total, product) => {
        return total + product.productId.price * product.quantity;
    }, 0);

    const paymentWithVNPAY = async () => {
        try {
            const newPayment = {
                amount: total,
                bankCode: null,
                language: "vn",
            };
            const newOrder = {
                orderItems: orderItems,
                shippingAddress1:
                    "Học viện Hàng không Việt Nam - 18A/1 phường 4 quận Tân Bình",
                shippingAddress2: customerInfo.address,
                city: customerInfo.city,
                country: customerInfo.country,
                phone: customerInfo.phone,
                status: "Pending",
                user: userData.id,
                shipping: shipping,
                payment: "VNPAY",
                note: note,
                dateOrdered: Date.now,
            };
            const res = await axios.post(
                `${API_PUBLIC_URL}vnpay/payment`,
                newPayment,
            );
            if (res.status === 200) {
                // console.log(newOrder);
                window.location.href = res.data;
            }
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container>
            {/* Shipping to */}
            <Stack className="flex-space-between" direction={"row"} spacing={5}>
                <div className="mg40">
                    <Summary />
                </div>
                <Stack>
                    <div>
                        <div className="">
                            <div className="mg20">
                                <p className="h5 medium dark-title">
                                    Shipping to...
                                </p>
                                <p className="h8 regular dark-lightest95 mg10">
                                    Please check berofe you finalize your order
                                </p>
                            </div>
                        </div>
                        <div>
                            {customerInfo ? (
                                <div>
                                    <Stack spacing={1} direction={"row"}>
                                        <Avatar
                                            sx={{ width: 56, height: 56 }}
                                            // src={}
                                        />
                                        <Stack spacing={3}>
                                            <div className="flex-space-between center">
                                                <div>
                                                    <Stack className="flex-row center">
                                                        <p
                                                            style={{
                                                                marginRight: 10,
                                                            }}
                                                            className="h6 medium dark-title"
                                                        >
                                                            {userData.name}
                                                        </p>

                                                        <img
                                                            height={20}
                                                            src={icons.Phone}
                                                            alt=""
                                                        />
                                                        <p className="h8 regular dark-lighter5a">
                                                            {customerInfo.phone}
                                                        </p>
                                                    </Stack>
                                                    <div className="flex-row center mg10">
                                                        <img
                                                            height={20}
                                                            src={icons.Home}
                                                            alt=""
                                                        />
                                                        <p
                                                            style={{
                                                                margin: "4px 0 0 4px",
                                                            }}
                                                            className="h8 regular dark-lighter5a"
                                                        >
                                                            {` ${customerInfo.address} - ${customerInfo.city} - ${customerInfo.country} `}
                                                        </p>
                                                    </div>
                                                </div>
                                                <IconButton>
                                                    <img
                                                        src={icons.Edit}
                                                        alt=""
                                                    />
                                                    <p>Edit info</p>
                                                </IconButton>
                                            </div>
                                        </Stack>
                                    </Stack>
                                    <div>
                                        <Stack
                                            direction={"row"}
                                            spacing={4}
                                            className="center"
                                        >
                                            <Stack direction={"row"}>
                                                <div>
                                                    <p className="h6 medium dark-lighter5a">
                                                        {shipping?.brand}
                                                    </p>
                                                    <p className="h8 regular dark-lightest95">
                                                        {shipping?.time_express}
                                                    </p>
                                                </div>
                                            </Stack>
                                            <Stack
                                                direction={"row"}
                                                spacing={1}
                                            >
                                                <img
                                                    height={20}
                                                    src={icons.Dollar}
                                                    alt=""
                                                />
                                                <p className="h7 medium dark-lighter5a">
                                                    Free Shipping
                                                </p>
                                            </Stack>
                                            <img
                                                width={120}
                                                src={shipping?.image}
                                                alt=""
                                            />
                                        </Stack>
                                    </div>
                                    <Stack spacing={"2"} direction={"row"}>
                                        <span className="h7 regular dark-title">
                                            Noted:
                                        </span>
                                        <span className="h7 regular dark-title">
                                            {note}
                                        </span>
                                    </Stack>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <Stack>
                        <div className="">
                            <div className="flex-space-between mg20 center">
                                <p className="h5 medium dark-title">
                                    Payment method
                                </p>
                                <Button variant="text">
                                    <p className="normal h8 regular indigo mg10">
                                        Change method
                                    </p>
                                </Button>
                            </div>

                            <FormControl>
                                <RadioGroup defaultValue={4}>
                                    <Container>
                                        <Stack direction={"column"}>
                                            <Stack
                                                direction={"row"}
                                                spacing={10}
                                            >
                                                <div>
                                                    <Radio
                                                        size="large"
                                                        value={0}
                                                        onClick={() =>
                                                            handleOptionPaymentChange(
                                                                0,
                                                            )
                                                        }
                                                    />
                                                    <div className="flex-row center">
                                                        <p className="h6 medium dark-title">
                                                            Credit Card
                                                        </p>
                                                        <img
                                                            height={28}
                                                            src={
                                                                logo.Master_Card
                                                            }
                                                            alt=""
                                                        />
                                                        <img
                                                            height={28}
                                                            src={logo.Visa}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="h8 regular dark-lightest95">
                                                        You can use all credit
                                                        card service.
                                                    </p>
                                                    <p className="h8 regular dark-lightest95">
                                                        We can accept Visa and
                                                        Master Card.
                                                    </p>
                                                </div>
                                                <div>
                                                    <Radio
                                                        size="large"
                                                        value={1}
                                                        onClick={() =>
                                                            handleOptionPaymentChange(
                                                                1,
                                                            )
                                                        }
                                                    />
                                                    <div className="flex-row center">
                                                        <p className="h6 medium dark-title">
                                                            Pay Pal
                                                        </p>
                                                        <img
                                                            height={28}
                                                            src={logo.Paypal}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="h8 regular dark-lightest95">
                                                        Insert your account
                                                        email of paypal.
                                                    </p>
                                                    <p className="h8 regular dark-lightest95">
                                                        We will process your
                                                        payment.
                                                    </p>
                                                </div>
                                            </Stack>
                                            <Stack
                                                direction={"row"}
                                                spacing={10}
                                            >
                                                <div>
                                                    <Radio
                                                        size="large"
                                                        value={2}
                                                        onClick={() =>
                                                            handleOptionPaymentChange(
                                                                2,
                                                            )
                                                        }
                                                    />
                                                    <div className="flex-row center">
                                                        <p className="h6 medium dark-title">
                                                            Cash payment (COD)
                                                        </p>
                                                        <img
                                                            height={28}
                                                            src={logo.CM}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="h8 regular dark-lightest95">
                                                        You can use all credit
                                                        card service.
                                                    </p>
                                                    <p className="h8 regular dark-lightest95">
                                                        We can accept Visa and
                                                        Master Card.
                                                    </p>
                                                </div>
                                                <div>
                                                    <Radio
                                                        size="large"
                                                        value={3}
                                                        defaultValue={3}
                                                        onClick={() =>
                                                            handleOptionPaymentChange(
                                                                3,
                                                            )
                                                        }
                                                    />
                                                    <div className="flex-row center">
                                                        <p className="h6 medium dark-title">
                                                            VNPAY
                                                        </p>
                                                        <img
                                                            height={28}
                                                            src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="h8 regular dark-lightest95">
                                                        Insert your account
                                                        email of paypal.
                                                    </p>
                                                    <p className="h8 regular dark-lightest95">
                                                        We will process your
                                                        payment.
                                                    </p>
                                                </div>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Stack>
                </Stack>
            </Stack>
            {/* Payment method */}

            <Stack spacing={2}>
                <Button
                    onClick={() => {
                        if (method === -1)
                            message.warning("Select payment method please!");
                        else if (method === 0) {
                            // xử lý payment 0
                        } else if (method === 1) {
                            // Xử lý payment 1
                        } else if (method === 2) {
                            handleConfirmOrder();
                        } else if (method === 3) {
                            paymentWithVNPAY();
                        }
                    }}
                    variant="contained"
                    className="button-contained"
                >
                    <img src={icons.Shipping_white} alt="" />
                    <p className="normal h7 medium white">Confirm order</p>
                </Button>
                <Button
                    onClick={handleBack}
                    variant="outlined"
                    className="button-outlined"
                >
                    <img src={icons.Arror_left} alt="" />
                </Button>
            </Stack>
        </Container>
    );
}
