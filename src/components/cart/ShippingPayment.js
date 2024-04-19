import React from "react";
import {
    Button,
    Card,
    Container,
    FormControl,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import icons from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { setShippingOption } from "../../redux/actions/cartAction";
import { shipping } from "../../utils/shipping";
import Summary from "./Sumary";
import { message } from "antd";
export default function ShippingPayment({ handleBack, handleComplete }) {
    // SELECTED SHIPPING AND PAYMENT METHOD TO RERENDER
    const dispatch = useDispatch();
    const selectedShippingOption = useSelector(
        (state) => state.shippingPayment.selectedShippingOption,
    );
    const handleOptionShippingChange = (option) => {
        dispatch(setShippingOption(option));
    };

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
                                    <Stack spacing={4}>
                                        {shipping
                                            .map((item, index) => (
                                                <Stack
                                                    key={index}
                                                    direction={"row"}
                                                    spacing={1}
                                                    className="center"
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
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
                                                                {
                                                                    item.time_express
                                                                }
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
