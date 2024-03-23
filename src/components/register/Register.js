import {
    Alert,
    Button,
    Container,
    Divider,
    FormGroup,
    InputBase,
    Paper,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";
import "./Register.scss";
import icons from "../../assets/icons";
import logo from "../../assets/logo";
import React, { useState } from "react";
import MainLayout from "../MainLayout";
import { useNavigate } from "react-router-dom";
import { API_PUBLIC_URL } from "../../utils/config";
import axios from "axios";

const Register = () => {
    return (
        <MainLayout>
            <Container className="register-main" maxWidth="lg">
                <Container className="register flex-space-between">
                    <Infor />
                    <RegisterForm />
                </Container>
                <LeadingBrand />
            </Container>
        </MainLayout>
    );
};

export const Infor = () => {
    return (
        <Stack spacing={3} className="register-1" width={540} height={586}>
            <p className="h2 medium dark-title">
                Join with +2 Milion seller who offer best product from all
                across country
            </p>

            <p className="h8 regular dark-lighter5a">
                Sign up now and get all big benefit from Elma e-commerce:
            </p>
            <Stack direction={"row"} spacing={1.5}>
                <img width={34} height={34} src={icons.Shipping} alt="" />
                <Stack direction={"column"} spacing={1}>
                    <p className="h6 medium dark-title">Free Shipping</p>
                    <p className="h8 regular dark-lightest95">
                        You will get free shipping from all your transactions.
                    </p>
                    <p className="h8 regular dark-lightest95">
                        No terms, no transaction limit.
                    </p>
                </Stack>
            </Stack>
            <Stack direction={"row"} spacing={1.5}>
                <img width={34} height={34} src={icons.Money} alt="" />
                <Stack direction={"column"} spacing={1}>
                    <p className="h6 medium dark-title">Money Back Guarantee</p>
                    <p className="h8 regular dark-lightest95">
                        You will get free shipping from all your transactions.
                    </p>
                    <p className="h8 regular dark-lightest95">
                        No terms, no transaction limit.
                    </p>
                </Stack>
            </Stack>
            <Stack direction={"row"} spacing={1.5}>
                <img
                    width={34}
                    height={34}
                    src={icons.CustomerService}
                    alt=""
                />
                <Stack direction={"column"} spacing={1}>
                    <p className="h6 medium dark-title">
                        24/7 Customer support
                    </p>
                    <p className="h8 regular dark-lightest95">
                        You will get free shipping from all your transactions.
                    </p>
                    <p className="h8 regular dark-lightest95">
                        No terms, no transaction limit.
                    </p>
                </Stack>
            </Stack>
        </Stack>
    );
};

export const RegisterForm = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(0);
    const [phonenumber, setPhonenumber] = useState("");
    const [password_hash, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleFullName = (e) => {
        setFirstname(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleGender = (e) => {
        const value = e.target.value;
        setGender(value);
    };
    const handlePhonenumber = (e) => {
        setPhonenumber(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");

    const handleRegister = async () => {
        let isValid = true;

        if (firstname === "") {
            setAlertMessage("Please enter your fullname!");
            setAlertSeverity("info");
            setShowAlert(true);
            isValid = false;
        } else if (email === "") {
            setAlertMessage("Please enter your email!");
            setAlertSeverity("info");
            setShowAlert(true);
            isValid = false;
        } else if (phonenumber === "") {
            setAlertMessage("Please enter your phonenumber!");
            setAlertSeverity("info");
            setShowAlert(true);
            isValid = false;
        } else if (!(password_hash === confirmPassword)) {
            setAlertMessage("Password and confirm password do not match!");
            setAlertSeverity("info");
            setShowAlert(true);
            isValid = false;
        }

        if (isValid) {
            const userData = {
                firstname,
                gender,
                email,
                password_hash,
                phonenumber,
            };
            try {
                const api = `${API_PUBLIC_URL}users/`;
                const res = await axios.post(api, userData);
                console.log(res);
                if (res.status === 200) {
                    setAlertMessage("Register to Elma successful!");
                    setAlertSeverity("success");
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                        navigate("/signin");
                    }, 1500);
                }
            } catch (error) {
                setAlertMessage(error.response.data);
                setAlertSeverity("error");
                setShowAlert(true);
                console.log(error);
            }
        }
    };
    return (
        <FormGroup
            style={{
                position: "relative",
            }}
        >
            {showAlert && (
                <Snackbar
                    open={showAlert}
                    autoHideDuration={3000}
                    onClose={() => setShowAlert(false)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <Alert
                        elevation={6}
                        variant="filled"
                        onClose={() => setShowAlert(false)}
                        severity={`${alertSeverity}`}
                        sx={{ width: "100%" }}
                    >
                        <p className="h8 regular">{alertMessage}</p>
                    </Alert>
                </Snackbar>
            )}
            <Stack width={540} height={650} className="register-2" spacing={3}>
                <p className="h3 medium dark-title">New Member on here?</p>
                <p className="h8 regular dark-lighter5a">
                    Register your account into us and you can start buy or sell
                    your product in here. Follow all the steps to finish
                    registration.
                </p>
                <div>
                    <p className="h8 regular dark-title">Full name</p>
                    <TextField
                        fullWidth
                        className="input firstname"
                        variant="outlined"
                        value={firstname}
                        type="text"
                        name="firstname"
                        onChange={handleFullName}
                    ></TextField>
                </div>

                <Stack spacing={3} direction={"row"}>
                    <div>
                        <p className="h8 regular dark-title">Email</p>
                        <TextField
                            type="email"
                            placeholder="example@gmail.com"
                            className="input email"
                            variant="outlined"
                            value={email}
                            name="email"
                            onChange={handleEmail}
                        ></TextField>
                    </div>
                    <div>
                        <p className="h8 regular dark-lighter5a">Gender</p>
                        <div className="">
                            <select
                                className="radius-4 input gender h8 regular"
                                name="gender"
                                id="gender"
                                value={gender}
                                onChange={handleGender}
                            >
                                <option value="0">Female</option>
                                <option value="1">Male</option>
                                <option value="2">Orther</option>
                            </select>
                        </div>
                    </div>
                </Stack>
                <Stack spacing={1} direction={"row"}>
                    <div>
                        <p className="h8 regular dark-title">Phone number</p>
                        <Paper
                            className="phonenumber"
                            component={"form"}
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <p className="h8 regular prefix-phone">+84</p>
                            <Divider
                                sx={{ height: 28, m: 0.5 }}
                                orientation="vertical"
                            />
                            <InputBase
                                placeholder="000 000 000"
                                className="input-phonenumber"
                                name="phonenumber"
                                onChange={handlePhonenumber}
                            />
                        </Paper>
                    </div>
                </Stack>
                <Stack spacing={3} direction={"row"}>
                    <div>
                        <p className="h8 regular dark-title">Password</p>
                        <TextField
                            type="password"
                            className="input firstname"
                            variant="outlined"
                            value={password_hash}
                            name="password"
                            onChange={handlePassword}
                        ></TextField>
                    </div>
                    <div>
                        <p className="h8 regular dark-lighter5a">
                            Confirm password
                        </p>
                        <TextField
                            type="password"
                            className="input firstname"
                            variant="outlined"
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={handleConfirmPassword}
                        ></TextField>
                    </div>
                </Stack>
                <Stack
                    className="btn-group"
                    width={485}
                    spacing={4}
                    direction={"row"}
                >
                    <Button
                        variant="contained"
                        onClick={() => handleRegister()}
                        className="create-account normal height48 primary-background radius-8"
                    >
                        <p className="h7 medium white">Create your account</p>
                    </Button>
                    <p className="or h8 regular dark-lightest95">or</p>
                    <Button
                        onClick={() => navigate("/signin")}
                        variant="contained"
                        className="login normal height48 primary-background radius-8"
                    >
                        <p className="h7 medium white">Login</p>
                    </Button>
                </Stack>
            </Stack>
        </FormGroup>
    );
};

export function LeadingBrand() {
    return (
        <Container className="leading-brand" maxWidth="lg">
            <p className="h3 medium dark-title">
                Trusted by leading brand in the world
            </p>
            <Stack className="brand-img-group" direction={"row"} spacing={6}>
                <img src={logo.Asus} alt="" />
                <img src={logo.Xiaomi} alt="" />
                <img src={logo.Samsung} alt="" />
                <img src={logo.Sony} alt="" />
                <img src={logo.Wacom} alt="" />
                <img src={logo.Apple} alt="" />
            </Stack>
        </Container>
    );
}

export default Register;
