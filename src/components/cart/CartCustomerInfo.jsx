import {
    Card,
    Checkbox,
    Divider,
    FormControlLabel,
    InputBase,
    Stack,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveAddress } from "../../redux/actions/cartAction";
export function CartCustomerInfo({ data, handleBack, handleComplete }) {
    const dispatch = useDispatch();
    const userAddress = useSelector((state) => state.notes.address);
    const [fullname, setFullname] = useState(data.name);
    const [phone, setPhone] = useState(data.phone);
    const [country, setCountry] = useState(data.country);
    const [city, setCity] = useState(data.city);
    const [address, setAddress] = useState(data.street);
    const [save, setSave] = useState(false);
    const requiredFields = [fullname, phone, country, city, address];
    const isAllFilled = requiredFields.every((field) => !!field);
    return (
        <div className="flex-space-between mg40">
            <Stack spacing={3}>
                <p className="h5 medium dark-title">Add Customer data</p>
                <Stack spacing={1}>
                    <p className="h8 regular dark-title">Full name</p>
                    <TextField
                        fullWidth
                        className="input firstname"
                        variant="outlined"
                        placeholder="Your first name"
                        defaultValue={data.name}
                        onChange={(e) => setFullname(e.target.value)}
                    ></TextField>
                </Stack>
                <Stack spacing={6} direction={"row"}>
                    <Stack spacing={1}>
                        <p className="h8 regular dark-title">Your Email</p>
                        <TextField
                            disabled
                            type="email"
                            placeholder="example@gmail.com"
                            className="input email firstname"
                            variant="outlined"
                            defaultValue={data.email}
                        ></TextField>
                    </Stack>
                    <Stack spacing={2} direction={"row"}>
                        <Stack spacing={1}>
                            <p className="h8 regular dark-title">
                                Phone number
                            </p>
                            <Card
                                className="phonenumber input non-box-shadown"
                                component={"form"}
                                sx={{ display: "flex", alignItems: "center" }}
                            >
                                <p
                                    style={{ margin: "0 6px" }}
                                    className="h8 regular prefix-phone"
                                >
                                    +84
                                </p>
                                <Divider
                                    sx={{ height: 28, m: 0.5 }}
                                    orientation="vertical"
                                />
                                <InputBase
                                    placeholder="000 000 000"
                                    className="input-phonenumber firstname"
                                    defaultValue={data.phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Card>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack spacing={6} direction={"row"}>
                    <Stack spacing={1}>
                        <p className="h8 regular dark-title">Country</p>
                        <TextField
                            className="input firstname"
                            variant="outlined"
                            placeholder="Viet Nam"
                            defaultValue={data.country}
                            onChange={(e) => setCountry(e.target.value)}
                        ></TextField>
                    </Stack>
                    <Stack spacing={1}>
                        <p className="h8 regular dark-lighter5a">City</p>
                        <TextField
                            className="input city"
                            variant="outlined"
                            placeholder="HCM"
                            defaultValue={data.city}
                            onChange={(e) => setCity(e.target.value)}
                        ></TextField>
                    </Stack>
                    {/* <Stack spacing={1}>
                        <p className="h8 regular dark-lighter5a">ZIP Code</p>
                        <TextField
                            className="input zip-code"
                            placeholder="123456"
                            variant="outlined"
                            value={data.zip}
                        ></TextField>
                    </Stack> */}
                </Stack>
                <div>
                    <p className="h8 regular dark-lighter5a">Address details</p>
                    <TextField
                        className="input firstname address"
                        variant="outlined"
                        placeholder="38 C1 Street Tan Binh"
                        defaultValue={data.street}
                        onChange={(e) => setAddress(e.target.value)}
                    ></TextField>
                </div>
                <div>
                    <FormControlLabel
                        className="check-box"
                        control={
                            <Checkbox
                                onChange={(e) => setSave(!save)}
                                size="large"
                            />
                        }
                        label="Save this new address in Elma E-commerce"
                    />
                </div>
            </Stack>
            <OrderSummary
                handleBack={handleBack}
                handleComplete={() => {
                    if (isAllFilled) {
                        dispatch(
                            saveAddress({
                                fullname,
                                phone,
                                country,
                                city,
                                address,
                            }),
                        );
                        handleComplete();
                    } else
                        message.info(
                            "Please fill in all required fields before reviewing your order. ",
                        );
                }}
            />
        </div>
    );
}
