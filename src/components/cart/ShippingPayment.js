import React, { useEffect, useState } from "react";
import logo from "../../assets/logo";
import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    FormControl,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
    setPaymentMethod,
    setShippingOption,
} from "../../redux/actions/cartAction";
import { shipping } from "../../utils/shipping";
import Summary from "./Sumary";
import { message } from "antd";
export default function ShippingPayment({
    shippings,
    payment,
    handleBack,
    handleComplete,
}) {
    // handle year of select
    const currentYear = new Date().getFullYear();
    const startYear = 2000; // Năm bắt đầu
    const endYear = currentYear + 50;
    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, index) => startYear + index,
    );
    const [selectedMonth, setSelectedMonth] = useState(0);
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    // SELECTED SHIPPING AND PAYMENT METHOD TO RERENDER
    const dispatch = useDispatch();
    const selectedShippingOption = useSelector(
        (state) => state.shippingPayment.selectedShippingOption,
    );
    const [selectedOption, setSelectedOption] = useState(1);

    const handleOptionShippingChange = (option) => {
        setSelectedOption(option.id);
        dispatch(setShippingOption(option));
    };
    const paymentMethod = useSelector(
        (state) => state.shippingPayment.selectedPaymentMethod,
    );
    const handleOptionPaymentChange = (method) => {
        setSelectedOption(method.id);
        dispatch(setPaymentMethod(method));
    };

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState(null);
    const [cvv, setCVV] = useState(null);

    const handleConfirmPayment = () => {
        setOpenBackdrop(true);
        if (
            cardName === "" ||
            cardNumber === "" ||
            cvv === "" ||
            selectedMonth === 0
        ) {
            setTimeout(() => {
                setOpenBackdrop(false);
            }, 3000);
            console.log("Payment info is not valid!");

            return;
            // should be notify to user error
        }
        const payment = {
            cardName: cardName,
            cardNumber: cardNumber,
            month: selectedMonth,
            year: selectedYear,
            cvv: cvv,
        };

        dispatch(setPaymentMethod(payment));
        setOpenBackdrop(false);

        // notify success
    };

    // backdrop
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };
    const handleOpenBackdrop = () => {
        setOpenBackdrop(true);
    };

    useEffect(() => {
        if (paymentMethod) {
            setCardName(paymentMethod?.cardName);
            setCardNumber(paymentMethod?.cardNumber);
            setCVV(paymentMethod?.cvv);
            setSelectedMonth(paymentMethod?.month);
            setSelectedYear(paymentMethod?.year);
        }
        setTimeout(() => {
            setOpenBackdrop(false);
        }, 3000);
    }, []);
    return (
        <Container className="mgpd0">
            {/* BACKDROP WHEN CONFIRM PAYMENT METHOD */}
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={openBackdrop}
                onClick={() => handleCloseBackdrop()}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* Choose Shipping Service & Payment with... */}
            <Stack
                className="flex-space-between"
                spacing={5}
                direction={"column"}
            >
                <div>
                    <div className="mg20">
                        <p className="h5 medium dark-title">
                            Choose Shipping Service
                        </p>
                        <p className="h8 regular dark-lightest95 mg10">
                            You can choose one best shipping service accross
                            your needs.
                        </p>
                    </div>
                    <FormControl>
                        <RadioGroup defaultValue={0}>
                            <Stack direction={"row"} spacing={25}>
                                <Stack spacing={4}>
                                    {shipping
                                        .map((item, index) => (
                                            <Stack
                                                key={index}
                                                direction={"row"}
                                                spacing={1}
                                                className="center"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Stack direction={"row"}>
                                                    <Radio
                                                        size="large"
                                                        value={item.id}
                                                        checked={
                                                            selectedShippingOption?.id ===
                                                            item.id
                                                        }
                                                        onClick={() =>
                                                            handleOptionShippingChange(
                                                                item,
                                                            )
                                                        }
                                                    />
                                                    <div>
                                                        <p className="h6 medium green">
                                                            {item.brand}
                                                        </p>
                                                        <p className="h8 regular dark-lightest95">
                                                            {item.time_express}
                                                        </p>
                                                    </div>
                                                </Stack>
                                                <div className="flex-row">
                                                    <img
                                                        height={20}
                                                        src={icons.Dollar}
                                                        alt=""
                                                    />
                                                    <p className="h7 medium green">
                                                        Free Shipping
                                                    </p>
                                                </div>
                                                <img
                                                    width={100}
                                                    src={item.image}
                                                    alt=""
                                                />
                                            </Stack>
                                        ))
                                        .slice(0, 6)}
                                </Stack>
                                {/* <Stack spacing={4}>
                                    {shipping
                                        .map((item, index) => (
                                            <Stack
                                                key={index}
                                                direction={"row"}
                                                spacing={1}
                                                className="center"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <Stack direction={"row"}>
                                                    <Radio
                                                        size="large"
                                                        value={item.id}
                                                        checked={
                                                            selectedShippingOption?.id ===
                                                            item.id
                                                        }
                                                        onClick={() =>
                                                            handleOptionShippingChange(
                                                                item,
                                                            )
                                                        }
                                                    />
                                                    <div>
                                                        <p className="h6 medium green">
                                                            {item.brand}
                                                        </p>
                                                        <p className="h8 regular dark-lightest95">
                                                            {item.time_express}
                                                        </p>
                                                    </div>
                                                </Stack>
                                                <div className="flex-row">
                                                    <img
                                                        height={20}
                                                        src={icons.Dollar}
                                                        alt=""
                                                    />
                                                    <p className="h7 medium green">
                                                        Free Shipping
                                                    </p>
                                                </div>
                                                <img
                                                    width={100}
                                                    src={item.image}
                                                    alt=""
                                                />
                                            </Stack>
                                        ))
                                        .slice(7, 15)}
                                </Stack> */}
                                <Summary />
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                </div>
                {/* <div className="mg20">
                    <div>
                        <p className="h5 medium dark-title">Payment with..</p>
                        <p className="h8 regular dark-lightest95 mg10">
                            Choose what service you want for your transaction
                        </p>
                    </div>
                    <FormControl>
                        <RadioGroup defaultValue={0}>
                            <Container>
                                <Stack direction={"row"} spacing={10}>
                                    <div>
                                        <Radio
                                            size="large"
                                            value={0}
                                            onClick={() =>
                                                handleOptionPaymentChange(0)
                                            }
                                        />
                                        <div className="flex-row center">
                                            <p className="h6 medium dark-title">
                                                Credit Card
                                            </p>
                                            <img
                                                height={28}
                                                src={logo.Master_Card}
                                                alt=""
                                            />
                                            <img
                                                height={28}
                                                src={logo.Visa}
                                                alt=""
                                            />
                                        </div>
                                        <p className="h8 regular dark-lightest95">
                                            You can use all credit card service.
                                        </p>
                                        <p className="h8 regular dark-lightest95">
                                            We can accept Visa and Master Card.
                                        </p>
                                    </div>
                                    <div>
                                        <Radio
                                            size="large"
                                            value={1}
                                            defaultValue={1}
                                            onClick={() =>
                                                handleOptionPaymentChange(1)
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
                                            Insert your account email of paypal.
                                        </p>
                                        <p className="h8 regular dark-lightest95">
                                            We will process your payment.
                                        </p>
                                    </div>
                                </Stack>
                            </Container>
                        </RadioGroup>
                    </FormControl>
                    <div style={{ margin: 25 }}>
                        <Stack spacing={9} direction={"row"}>
                            <div className="">
                                <p className="h8 regular dark-title mg10">
                                    Card name
                                </p>
                                <TextField
                                    className="input"
                                    placeholder="Eg. Join Elma"
                                    value={cardName}
                                    onChange={(e) =>
                                        setCardName(e.target.value)
                                    }
                                ></TextField>
                            </div>
                            <div className="">
                                <p className="h8 regular dark-title mg10">
                                    Card number
                                </p>
                                <TextField
                                    className="input"
                                    placeholder="1234 5678 1234 5678"
                                    value={cardNumber}
                                    onChange={(e) =>
                                        setCardNumber(e.target.value)
                                    }
                                ></TextField>
                            </div>
                        </Stack>
                        <Stack className="mg20" direction={"row"} spacing={3}>
                            <div className="month">
                                <p className="h8 regular dark-title mg10">
                                    Month
                                </p>
                                <Select
                                    style={{ width: "200px" }}
                                    className="select"
                                    defaultValue={0}
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                >
                                    <MenuItem
                                        className="h7 regular dark-title"
                                        value={0}
                                    >
                                        <p className="h8 regular dark-title">
                                            Choose month
                                        </p>
                                    </MenuItem>
                                    {[...Array(12).keys()].map((month) => (
                                        <MenuItem
                                            className="h7 regular dark-title"
                                            key={month + 1}
                                            value={month + 1}
                                            style={{ height: 48 }}
                                        >
                                            <p className="h8 regular dark-title">
                                                {month + 1}
                                            </p>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="year">
                                <p className="h8 regular dark-title mg10">
                                    Year
                                </p>
                                <Select
                                    style={{ width: "200px" }}
                                    className="select"
                                    defaultValue={currentYear}
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                >
                                    <MenuItem
                                        className="h7 regular dark-title"
                                        value={0}
                                        style={{ height: 48 }}
                                    >
                                        <p className="h8 regular dark-title">
                                            Choose year
                                        </p>
                                    </MenuItem>
                                    {years.map((year) => (
                                        <MenuItem
                                            className="h7 regular dark-title"
                                            key={year}
                                            value={year}
                                        >
                                            <p className="h8 regular dark-title">
                                                {year}
                                            </p>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="cvv">
                                <p className="h8 regular dark-title mg10">
                                    CVV
                                </p>
                                <TextField
                                    placeholder="000"
                                    className="input"
                                    style={{ width: "80px" }}
                                    value={cvv}
                                    onChange={(e) => setCVV(e.target.value)}
                                ></TextField>
                            </div>
                        </Stack>
                        <Button
                            fullWidth
                            onClick={() => handleConfirmPayment()}
                            variant="outlined"
                            className="button-outlined mg20"
                        >
                            <p className="normal h7 regular dark-title">
                                Confirm payment
                            </p>
                        </Button>
                    </div>
                </div> */}
                <Stack spacing={2}>
                    <Button
                        fullWidth
                        onClick={() => {
                            if (selectedShippingOption === null) {
                                message.warning(
                                    "Please select a shipping option!",
                                );
                            } else {
                                handleComplete();
                            }
                        }}
                        variant="contained"
                        className="button-contained"
                    >
                        <img
                            style={{ width: "20px", margin: "4px" }}
                            src={icons.Card_white}
                            alt=""
                        />
                        <p className="normal h7 regular white">
                            Proceed to Checkout
                        </p>
                    </Button>
                    <Button
                        fullWidth
                        onClick={handleBack}
                        variant="outlined"
                        className="button-outlined"
                    >
                        <img src={icons.Arror_left} alt="" />
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
