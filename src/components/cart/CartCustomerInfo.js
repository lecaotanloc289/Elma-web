import {
    Box,
    Card,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputBase,
    Select,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getCities,
    getDistricts,
    saveAddress,
} from "../../redux/actions/cartAction";
import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import { fetchUserData } from "../../redux/thunk";
export function CartCustomerInfo({ data, handleBack, handleComplete }) {
    const userData = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState(data.name);
    const [phone, setPhone] = useState(data.phone);
    const [country, setCountry] = useState(data.country);
    const [city, setCity] = useState(data.city);
    const [address, setAddress] = useState(data.street);
    const requiredFields = [fullname, phone, country, city, address];
    const isAllFilled = requiredFields.every((field) => !!field);
    const handleSave = async (isChecked) => {
        if (isChecked) {
            let userId;
            if (userData) {
                userId = userData.id;
            }
            const updateInfo = {
                name: fullname,
                phone: phone,
                country: country,
                city: city,
                street: address,
            };
            const res = await axios.put(
                `${API_PUBLIC_URL}users/${userId}`,
                updateInfo,
            );
            if (res.status === 200) {
                message.success("Save new address success!");
                // fetch lại data người dùng.
                await fetchUserData(userId);
            }
        }
    };
    const [listCities, setListCities] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [citySelected, setCitySelected] = useState([]);
    const [districtSelected, setDistrictSelected] = useState([]);
    const goshipToken = useSelector((state) => state.goship.token);
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cities = await getCities(goshipToken);
                if (cities?.data && country) {
                    setListCities(cities.data);
                } else {
                    console.error("Failed to fetch cities!");
                }
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        if (listCities.length === 0 && goshipToken) {
            fetchCities();
        }
    }, [goshipToken, listCities]);

    const handleCitySelected = async (event) => {
        const selectedCityId = event.target.value;
        const selectedCity = listCities.filter(
            (item) => selectedCityId === item.id,
        );
        // console.log(selectedCityId);
        setCitySelected(selectedCity?.[0]);
        try {
            const districts = await getDistricts(selectedCityId, goshipToken);
            // console.log(districts.data);
            setListDistricts(districts.data);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const handleDistrictSelected = (event) => {
        const selectedDistrictId = event.target.value;
        // console.log(selectedDistrictId);
        const selectedDistrict = listDistricts.filter(
            (item) => selectedDistrictId === item.id,
        );
        const choose = selectedDistrict?.[0];
        console.log(choose);
        setDistrictSelected(choose);
    };
    useEffect(() => {
        setCountry(citySelected?.name);
        setCity(districtSelected?.name);
        const shipTo = JSON.stringify({
            city: citySelected,
            district: districtSelected,
        });
        localStorage.setItem("shipTo", shipTo);
    }, [districtSelected]);
    console.log(data.country);
    console.log(data.city);
    return (
        <div className="flex-space-between mg40">
            <Card
                className="non-box-shadow"
                style={{
                    padding: "20px 24px",
                }}
            >
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
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
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
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </Card>
                            </Stack>
                        </Stack>
                    </Stack>
                    {/* <Stack spacing={6} direction={"row"}>
                        <Stack spacing={1}>
                            <p className="h8 regular dark-title">Province / City</p>
                            <TextField
                                className="input firstname"
                                variant="outlined"
                                placeholder="Viet Nam"
                                defaultValue={data.country}
                                onChange={(e) => setCountry(e.target.value)}
                            ></TextField>
                        </Stack>
                        <Stack spacing={1}>
                            <p className="h8 regular dark-lighter5a">District</p>
                            <TextField
                                className="input city"
                                variant="outlined"
                                placeholder="HCM"
                                defaultValue={data.city}
                                onChange={(e) => setCity(e.target.value)}
                            ></TextField>
                        </Stack>
                    </Stack> */}

                    <div>
                        {listCities ? (
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <p className="h8 regular dark-lighter5a">
                                        Province / City
                                    </p>
                                    <Select
                                        // value={country}
                                        onChange={handleCitySelected}
                                    >
                                        {listCities.map((item) => (
                                            <MenuItem value={item.id}>
                                                <span
                                                    className="input"
                                                    style={{
                                                        fontSize: 16,
                                                        height: 40,
                                                    }}
                                                >
                                                    {item.name}
                                                </span>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        ) : (
                            <div>
                                <MenuItem>City</MenuItem>
                            </div>
                        )}
                    </div>

                    <div>
                        {listDistricts ? (
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <p className="h8 regular dark-lighter5a">
                                        District
                                    </p>
                                    <Select
                                        // value={districtSelected?.[0]?.id}
                                        onChange={handleDistrictSelected}
                                    >
                                        {listDistricts.map((item) => (
                                            <MenuItem value={item.id}>
                                                <span
                                                    className="input"
                                                    style={{
                                                        fontSize: 16,
                                                        height: 40,
                                                    }}
                                                >
                                                    {item.name}
                                                </span>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        ) : (
                            <div>
                                <MenuItem>District</MenuItem>
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="h8 regular dark-lighter5a">
                            Address details
                        </p>
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
                                    onChange={(e) =>
                                        handleSave(e.target.checked)
                                    }
                                    size="large"
                                />
                            }
                            label="Save this new address in Elma E-commerce"
                        />
                    </div>
                </Stack>
            </Card>
            <Card
                className="non-box-shadow"
                style={{
                    padding: "20px 24px",
                    maxWidth: 500,
                }}
            >
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
            </Card>
        </div>
    );
}
