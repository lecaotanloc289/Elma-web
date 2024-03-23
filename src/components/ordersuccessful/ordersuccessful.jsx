import { Container } from "@mui/system";
import React from "react";
import { images } from "../../assets/images";
import "./ordersuccessful.scss";
import { Button, ButtonGroup, Stack } from "@mui/material";
import icons from "../../assets/icons";
import {
    CarCrash,
    ChevronLeftRounded,
    LocalShipping,
} from "@mui/icons-material";
import MainLayout from "../MainLayout";
import { useNavigate } from "react-router-dom";

export default function Ordersuccessful() {
    const navigate = useNavigate();
    const orderId = localStorage.getItem("newOrder");
    return (
        <MainLayout>
            {orderId ? (
                <Container className="container" maxWidth="lg">
                    <Stack className="success" spacing={5}>
                        <img width={100} src={images.Successful} alt="" />

                        <Stack spacing={0.5}>
                            <p className="success h2 medium primary-color">
                                Purchase Success!
                            </p>
                            <p className="success h8 regular dark-lightest95 ">
                                Thank’s for your order at Elma e-commerce. Your
                                order will be processed as soon as possible.
                            </p>
                            <p className="success h8 regular dark-lightest95">
                                Make sure you make note of your order number,
                                which is{" "}
                                <b
                                    style={{ paddingLeft: 4 }}
                                    className="black"
                                >{` ${orderId}`}</b>
                                .
                            </p>
                            <p className="success h8 regular dark-lightest95">
                                You will be receiving an email shortly with
                                invoice from your order.
                            </p>
                        </Stack>

                        <Stack className="ls" direction={"row"} spacing={2}>
                            <Button
                                className="btn btn1"
                                variant="text"
                                onClick={() => navigate("/")}
                            >
                                <ChevronLeftRounded className="icon indigo" />
                                <p className="normal h7 medium indigo">
                                    Back to shopping
                                </p>
                            </Button>
                            <Button
                                className="btn2"
                                variant="contained"
                                onClick={() => navigate("/ordertracking")}
                            >
                                <LocalShipping className="icon white " />
                                <p className="normal h7 medium white">
                                    Track your order
                                </p>
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            ) : (
                <></>
            )}
        </MainLayout>
    );
}
