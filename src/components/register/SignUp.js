import React, { useState } from "react";
import MainLayout from "../MainLayout";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Checkbox,
    Container,
    Divider,
    InputBase,
    Stack,
    TextField,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo";
import "./SignUp.scss";
import * as Yup from "yup";
import { message } from "antd";
import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const validationSignUp = Yup.object().shape({
        name: Yup.string().required("Name is require"),
        email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        phone: Yup.string().required("Phone is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
    });
    const handleSignIn = async () => {
        try {
            await validationSignUp.validate(
                {
                    name,
                    email,
                    phone,
                    password,
                    confirmPassword,
                },
                { abortEarly: false },
            );
            const newUserInfo = {
                firstname: name,
                email: email,
                phone: phone,
                password_hash: password,
                gender: 2,
            };
            try {
                const res = await axios.post(
                    `${API_PUBLIC_URL}users`,
                    newUserInfo,
                );
                if (res.status === 200) {
                    message.success("Register success!");
                    setTimeout(() => {
                        navigate("/signin");
                    }, 2000);
                }
            } catch (error) {
                message.error(error.response.data);
            }
        } catch (errors) {
            const errorMessages = {};
            errors.inner.forEach((error) => {
                errorMessages[error.path] = error.message;
                message.warning(error.message);
            });
            console.log("Validation errors: ", errorMessages);
        }
    };
    return (
        <MainLayout>
            <div className="signin">
                <div className="signin-1"></div>
                <div style={{ height: 500 }} className="signin-2"></div>
                <Container className="signin-main flex-space-between">
                    <Card className="card radius-8" sx={{ minWidth: 540 }}>
                        <CardContent className="signin-items">
                            <Stack spacing={3}>
                                <Stack spacing={25} direction={"row"}>
                                    <h3 className="h3 medium">
                                        Sign in to Elma
                                    </h3>
                                    <a
                                        href="#nothing"
                                        onClick={() => navigate("/register")}
                                        className="register-here h7 regular indigo"
                                    >
                                        Register here &gt;
                                    </a>
                                </Stack>
                                <Stack direction={"row"} spacing={3}>
                                    {/* <GoogleLogin
                                        onSuccess={responseMessage}
                                        onError={errorMessage}
                                    ></GoogleLogin> */}

                                    <Button
                                        className="register-with-gg radius-8  "
                                        fullWidth
                                        variant="contained"
                                        startIcon={
                                            <Google className="gg-register" />
                                        }
                                    >
                                        <p className="normal h7 regular">
                                            Register with Google
                                        </p>
                                    </Button>
                                    <Button
                                        className="register-with-twitter radius-8"
                                        variant="contained"
                                    >
                                        <img src={logo.twitter} alt="" />
                                    </Button>
                                    <Button
                                        className="register-with-facebook radius-8"
                                        variant="contained"
                                    >
                                        <img src={logo.facebook} alt="" />
                                    </Button>
                                </Stack>
                                <Stack direction={"row"} spacing={4}>
                                    <Stack spacing={2}>
                                        <Divider />
                                        <span className="h7 regular">
                                            Your name
                                        </span>
                                        <TextField
                                            style={{ width: 245 }}
                                            className="input"
                                            type="name"
                                            name="name"
                                            placeholder="Enter your name"
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            value={name}
                                        ></TextField>
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Divider />
                                        <span className="h7 regular">
                                            Email
                                        </span>
                                        <TextField
                                            style={{ width: 245 }}
                                            className="input"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            value={email}
                                        ></TextField>
                                    </Stack>
                                </Stack>
                                <Stack spacing={2}>
                                    <p className="h7 regular">Phone number</p>
                                    <Card
                                        variant="outlined"
                                        className="center flex input"
                                    >
                                        <span
                                            style={{ margin: "0px 8px" }}
                                            className=" h7 regular"
                                        >
                                            +84
                                        </span>
                                        <Divider orientation="vertical" />
                                        <InputBase
                                            fullWidth
                                            className="input non-box-shadow"
                                            type="phone"
                                            name="phone"
                                            placeholder="Enter your phonenumber"
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            value={phone}
                                        ></InputBase>
                                    </Card>
                                </Stack>
                                <Stack direction={"row"} spacing={4}>
                                    <Stack spacing={2}>
                                        <span className="h7 regular">
                                            Password
                                        </span>
                                        <TextField
                                            style={{ width: 245 }}
                                            className="input"
                                            type="password"
                                            name="password"
                                            placeholder="Enter password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            value={password}
                                        ></TextField>
                                    </Stack>
                                    <Stack spacing={2}>
                                        <span className="h7 regular">
                                            Confirm password
                                        </span>
                                        <TextField
                                            style={{ width: 245 }}
                                            className="input"
                                            type="password"
                                            name="passwordconfirm"
                                            placeholder="Enter password confirm"
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                            value={confirmPassword}
                                        ></TextField>
                                    </Stack>
                                </Stack>
                                <Stack className="center" direction={"row"}>
                                    <Checkbox size="large" checked />
                                    <span className="h7 regular">
                                        Agree about Terms & Privacy on Elma
                                    </span>
                                </Stack>
                                <Button
                                    onClick={handleSignIn}
                                    className="mg40 signin-button radius-8"
                                    fullWidth
                                    variant="contained"
                                >
                                    <p className="normal h7 medium">
                                        Create new account
                                    </p>
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                    <CardActionArea
                        className="slide-signin"
                        sx={{ minWidth: 350 }}
                    ></CardActionArea>
                </Container>
            </div>
        </MainLayout>
    );
};

export default SignUp;
