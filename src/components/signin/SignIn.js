import React, { useEffect, useState } from "react";
import "./SignIn.scss";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Divider,
    FormGroup,
    IconButton,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo";
import { useDispatch, useSelector } from "react-redux";
import {
    signInAndLoadUserData,
    signInWithGoogle,
} from "../../redux/actions/signInAction";
import MainLayout from "../MainLayout";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
export default function SignIn() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password_hash, setPassword] = useState("");
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [notify, setNotify] = useState("");

    const handleClose = (event) => {
        setOpenSnackBar(false);
    };
    if (isAuthenticated) {
        navigate("/");
    }
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSignIn = async () => {
        if (email === "" && password_hash === "") {
            setNotify("Please enter your email and password!");
            setSignInSuccess(false);
            setOpenSnackBar(true);
            return;
        }
        if (email === null || email === "") {
            setNotify("Please enter your email");
            setSignInSuccess(false);
            setOpenSnackBar(true);
            return;
        } else if (password_hash === null || password_hash === "") {
            setNotify("Please enter your password");
            setSignInSuccess(false);
            setOpenSnackBar(true);
            return;
        } else
            dispatch(
                signInAndLoadUserData({
                    email: email,
                    password_hash: password_hash,
                }),
            );
    };

    // CREATING A USER PROFILE BASED ON THE USER'S GOOGLE PROFILE
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            console.log(profile);
            dispatch(signInWithGoogle(profile));
        },
        onError: (error) => console.log("Login failed", error),
    });

    useEffect(() => {
        if (user) {
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    },
                )
                .then((response) => {
                    setProfile(response.data);
                })
                .catch((error) => console.log(error));
        }
    }, [user]);

    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    // const responseMessage = async (response) => {
    //     // await axios.get(`${API_PUBLIC_URL}auth/google`);
    //     console.log(response);
    // };
    // const errorMessage = (error) => {
    //     console.log(error);
    // };

    return (
        <MainLayout>
            {
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    message={notify}
                    action={action}
                />
            }
            {/* TEST FOR LOGIN WITH GOOGLE */}
            {/* {profile !== null ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )} */}

            <div className="signin">
                <div className="signin-1"></div>
                <div className="signin-2"></div>
                <Container className="signin-main flex-space-between">
                    <Card className="card radius-8" sx={{ minWidth: 540 }}>
                        <CardContent className="signin-items">
                            <Stack spacing={5}>
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
                                <Stack
                                    direction={"row"}
                                    spacing={3}
                                    className="flex-center center"
                                >
                                    {/* <GoogleLogin
                                        onSuccess={responseMessage}
                                        onError={errorMessage}
                                        locale="en"
                                        className="google-login"

                                    /> */}

                                    <Button
                                        className="google-login radius-8  "
                                        fullWidth
                                        variant="outlined"
                                        onClick={login}
                                        startIcon={
                                            <FcGoogle className="gg-register" />
                                        }
                                    >
                                        <p className="normal h7 regular">
                                            Signin with Google
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
                                <Divider />
                                <FormGroup>
                                    <Stack spacing={2}>
                                        <p className="h7 regular">Email</p>
                                        <TextField
                                            className="input"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            value={email}
                                        ></TextField>
                                        <tr className="flex-space-between">
                                            <td>
                                                <p
                                                    typeof="password"
                                                    className="h7 regular"
                                                >
                                                    Password
                                                </p>
                                            </td>
                                            <td>
                                                <a
                                                    href="#nothing"
                                                    onClick={() =>
                                                        navigate(
                                                            "/forgotpassword",
                                                        )
                                                    }
                                                    className="link-nomal-cusor indigo"
                                                >
                                                    <p className="h7 regular">
                                                        Forgot password
                                                    </p>
                                                </a>
                                            </td>
                                        </tr>
                                        <TextField
                                            className="input "
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        ></TextField>
                                    </Stack>

                                    <Button
                                        onClick={handleSignIn}
                                        className="mg40 signin-button radius-8"
                                        fullWidth
                                        variant="contained"
                                    >
                                        <p className="normal h7 regular">
                                            Sign In
                                        </p>
                                    </Button>
                                </FormGroup>
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
}
