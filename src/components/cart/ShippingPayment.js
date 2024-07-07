import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Container,
    FormControl,
    Radio,
    RadioGroup,
    Skeleton,
    Stack,
} from "@mui/material";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
    getGoshipRates,
    setShippingOption,
} from "../../redux/actions/cartAction";
import Summary from "./Sumary";
import { message } from "antd";
import { formattedNumber } from "../../utils/appService";
export default function ShippingPayment({ handleBack, handleComplete }) {
    const [shippingRates, setShippingRates] = useState(null);
    const dispatch = useDispatch();

    const selectedShippingOption = useSelector(
        (state) => state.shippingPayment.selectedShippingOption,
    );
    const handleOptionShippingChange = (option) => {
        console.log(option);
        dispatch(setShippingOption(option));
    };
    // data get from cart customer info
    const shipTo = JSON.parse(localStorage.getItem("shipTo"));
    // console.log(shipTo);
    const products = JSON.parse(localStorage.getItem("selectedProducts"));

    // GOSHIP API INTEGRETED
    const goshipToken = useSelector((state) => state.goship.token);
    // console.log(goshipToken);
    // const rates = getGoshipRates(goshipToken);
    // console.log(rates.data?.data);
    useEffect(() => {
        (async () => {
            const rates = await getGoshipRates(goshipToken, shipTo, products);
            if (rates) {
                console.log(rates);
                setShippingRates(rates);
            } else console.log("Failed to fetch rates!");
        })();
    }, [goshipToken]);
    const skeletonShipItems = Array.from({ length: 4 });
    console.log(shippingRates);
    return (
        <Container className="mgpd0">
            {/* Choose Shipping Service & Payment with... */}
            <Stack
                className="flex-space-between"
                spacing={5}
                direction={"column"}
            >
                <Card
                    className=" mg40 radius-8 non-box-shadow"
                    style={{
                        padding: "0 20px",
                    }}
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
                                    <Stack spacing={1}>
                                        {shippingRates !== null ? (
                                            shippingRates?.data?.map(
                                                (item, index) => (
                                                    <Stack
                                                        key={index}
                                                        direction={"row"}
                                                        spacing={1}
                                                        className="center"
                                                        style={{
                                                            cursor: "pointer",
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <Stack
                                                            direction={"row"}
                                                        >
                                                            <Radio
                                                                size="large"
                                                                value={item?.id}
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
                                                                    {
                                                                        item?.carrier_name
                                                                    }
                                                                </p>
                                                                <p className="h8 regular dark-lightest95">
                                                                    {
                                                                        item?.expected
                                                                    }
                                                                </p>
                                                            </div>
                                                        </Stack>
                                                        <Stack
                                                            spacing={2}
                                                            className=""
                                                        >
                                                            <div className="flex-row">
                                                                <img
                                                                    height={20}
                                                                    src={
                                                                        icons.Dollar
                                                                    }
                                                                    alt=""
                                                                />
                                                                <p className="h7 medium green">
                                                                    {formattedNumber(
                                                                        item?.total_fee,
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </Stack>
                                                        <img
                                                            width={100}
                                                            src={
                                                                item?.carrier_logo
                                                            }
                                                            alt=""
                                                        />
                                                    </Stack>
                                                ),
                                            )
                                        ) : (
                                            <Stack spacing={3}>
                                                {skeletonShipItems.map(
                                                    (item) => (
                                                        <Stack
                                                            direction="row"
                                                            spacing={2}
                                                            minWidth={200}
                                                            className="flex-center center"
                                                        >
                                                            <Skeleton
                                                                variant="circular"
                                                                width={20}
                                                                height={20}
                                                            />
                                                            <div>
                                                                <Skeleton
                                                                    variant="text"
                                                                    width={150}
                                                                    height={30}
                                                                />
                                                                <Skeleton
                                                                    variant="text"
                                                                    width={200}
                                                                    height={15}
                                                                />
                                                            </div>
                                                            <Stack
                                                                direction="row"
                                                                spacing={2}
                                                                className="flex center"
                                                            >
                                                                <Skeleton
                                                                    variant="circular"
                                                                    width={20}
                                                                    height={20}
                                                                />
                                                                <Skeleton
                                                                    variant="text"
                                                                    width={150}
                                                                    height={30}
                                                                />
                                                            </Stack>
                                                            <Skeleton
                                                                variant="rounded"
                                                                width={80}
                                                                height={80}
                                                            />
                                                        </Stack>
                                                    ),
                                                )}
                                            </Stack>
                                        )}
                                    </Stack>
                                    <Summary />
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Card>

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
