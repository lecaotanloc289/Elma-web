import React from "react";
import MainLayout from "../MainLayout";
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Stack,
    TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icons from "../../assets/icons";

export default function User() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.userData);
    if (isAuthenticated === false) {
        navigate("/signin");
    }
    console.log(userData);
    return (
        <MainLayout>
            {userData !== undefined ? (
                <Container maxWidth={"lg"}>
                    {/* HEADER */}
                    <Stack
                        direction={"row"}
                        className="flex-space-between center mg20"
                    >
                        <div>
                            <p className="h2 medium dark-title ">
                                User profile
                            </p>
                        </div>
                        <Button
                            onClick={() => navigate("/")}
                            className="button-outlined"
                            variant="outlined"
                        >
                            <img height={20} src={icons.Home} alt="" />
                            <p className="normal h7 medium indigo">
                                Go to Homepage
                            </p>
                        </Button>
                    </Stack>
                    {/* BODY */}
                    <Stack
                        style={{ display: "flex", justifyContent: "center" }}
                        direction="row"
                        spacing={3}
                    >
                        {/* SECTION 1 */}
                        <Stack>
                            <Card
                                sx={{ minWidth: 345, margin: "20px auto" }}
                                variant="outlined"
                            >
                                <CardMedia
                                    component={"img"}
                                    alt="Background"
                                    height={180}
                                    src="https://images.unsplash.com/photo-1708649290066-5f617003b93f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
                                    style={{ marginBottom: -60 }}
                                />
                                <CardContent>
                                    <Stack
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        spacing={2}
                                    >
                                        <Avatar
                                            sx={{ width: 80, height: 80 }}
                                            src={userData.avatar}
                                        />
                                        <span className="h5 medium">
                                            {userData.name}
                                        </span>
                                        <span className="h7 regular">
                                            {userData.street}
                                        </span>
                                    </Stack>
                                </CardContent>
                                <CardActions
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: 30,
                                    }}
                                >
                                    <Stack direction={"row"} spacing={2}>
                                        <Button
                                            className="normal primary-background"
                                            variant="contained"
                                        >
                                            <span className="h8 regular">
                                                View more
                                            </span>
                                        </Button>
                                        <Button
                                            className="normal primary-background"
                                            variant="contained"
                                        >
                                            <span className="h8 regular">
                                                Edit profile
                                            </span>
                                        </Button>
                                    </Stack>
                                </CardActions>
                            </Card>
                            <Card
                                sx={{ maxWidth: 345, marginBottom: 5 }}
                                variant="outlined"
                            >
                                <Container className="mg20">
                                    <span className="h5 medium">
                                        Select profile photo
                                    </span>
                                    <Stack
                                        style={{ marginTop: 10 }}
                                        spacing={1}
                                        direction={"row"}
                                    >
                                        <Avatar variant="rounded" />
                                        <Avatar variant="rounded" />
                                        <Stack>
                                            <span className="h7 regular">
                                                Choose image
                                            </span>
                                            <span className="h8 regular">
                                                JPG, GIF or PNG, Max size of
                                                800K
                                            </span>
                                        </Stack>
                                    </Stack>
                                </Container>
                            </Card>
                        </Stack>
                        {/* SECTION 2 */}
                        <Stack>
                            <Card
                                sx={{ minWidth: 600 }}
                                className="mg20"
                                variant="outlined"
                            >
                                <Container className="mg20">
                                    <span className="h5 medium">
                                        Your infomation
                                    </span>
                                    <Stack
                                        style={{
                                            marginTop: 10,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        spacing={1}
                                    >
                                        <Stack
                                            className="mg10"
                                            spacing={3}
                                            direction={"row"}
                                        >
                                            <Stack>
                                                <span className="h7 regular">
                                                    Name
                                                </span>
                                                <TextField
                                                    style={{ width: 512 }}
                                                    fullWidth
                                                    className="input"
                                                    type="name"
                                                    name="name"
                                                    placeholder="Enter your name"
                                                    defaultValue={userData.name}
                                                />
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            spacing={3}
                                            className="mg10"
                                            direction={"row"}
                                        >
                                            <Stack>
                                                <span className="h7 regular">
                                                    Birthday
                                                </span>
                                                <TextField
                                                    style={{ width: 245 }}
                                                    className="input"
                                                    type="name"
                                                    name="name"
                                                    placeholder="Enter your name"
                                                    defaultValue={
                                                        userData.birthday
                                                    }
                                                ></TextField>
                                            </Stack>
                                            <Stack>
                                                <span className="h7 regular">
                                                    Gender
                                                </span>
                                                <TextField
                                                    style={{ width: 245 }}
                                                    className="input"
                                                    type="name"
                                                    name="name"
                                                    placeholder="Enter your name"
                                                    defaultValue={
                                                        userData.gender
                                                    }
                                                ></TextField>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            spacing={3}
                                            className="mg10"
                                            direction={"row"}
                                        >
                                            <Stack>
                                                <span className="h7 regular">
                                                    Email
                                                </span>
                                                <TextField
                                                    style={{ width: 245 }}
                                                    className="input"
                                                    type="name"
                                                    name="name"
                                                    placeholder="Enter your name"
                                                    defaultValue={
                                                        userData.email
                                                    }
                                                ></TextField>
                                            </Stack>
                                            <Stack>
                                                <span className="h7 regular">
                                                    Phone
                                                </span>
                                                <TextField
                                                    style={{ width: 245 }}
                                                    className="input"
                                                    type="name"
                                                    name="name"
                                                    placeholder="Enter your name"
                                                    defaultValue={
                                                        userData.phone
                                                    }
                                                ></TextField>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            spacing={3}
                                            className="mg10"
                                            direction={"row"}
                                        >
                                            <Stack>
                                                <span className="h7 regular">
                                                    Address
                                                </span>
                                                <TextField
                                                    style={{ width: 245 }}
                                                    className="input"
                                                    type="address"
                                                    name="address"
                                                    placeholder="Enter your address"
                                                    defaultValue={
                                                        userData.street
                                                    }
                                                ></TextField>
                                            </Stack>
                                            <Stack>
                                                <span className="h7 regular">
                                                    City / Country
                                                </span>
                                                <TextField
                                                    style={{ width: 245 }}
                                                    className="input"
                                                    type="country"
                                                    name="country"
                                                    placeholder="Enter your country"
                                                    defaultValue={`${userData.city} - ${userData.country}`}
                                                ></TextField>
                                            </Stack>
                                        </Stack>
                                        <Button
                                            variant="outlined"
                                            className="button-outlined normal mg10"
                                        >
                                            <span className="h7 regular">
                                                Save all
                                            </span>
                                        </Button>
                                    </Stack>
                                </Container>
                            </Card>
                        </Stack>
                    </Stack>
                </Container>
            ) : (
                <></>
            )}
        </MainLayout>
    );
}
