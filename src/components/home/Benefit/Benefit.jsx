import { Container, Stack } from "@mui/material";
import React from "react";
import "./Benefit.scss";
import {
    CreditCard,
    LocalAtm,
    LocalShipping,
    SupportAgent,
} from "@mui/icons-material";

const Benefit = () => {
    return (
        <Container className="benefit" maxWidth="lg">
            <Stack className="stack" spacing={2} direction={"row"}>
                <LocalShipping className="icon" />
                <Stack spacing={0.5}>
                    <p className="name h6">Free Shipping</p>
                    <p className="content h8 regular dark-lightest95">
                        Free delivery for all orders
                    </p>
                </Stack>
            </Stack>

            <Stack className="stack" spacing={2} direction={"row"}>
                <LocalAtm className="icon" />
                <Stack spacing={0.5}>
                    <p className="name h6">Money Guarantee</p>
                    <p className="content h8 regular dark-lightest95">
                        30 days money back
                    </p>
                </Stack>
            </Stack>

            <Stack className="stack" spacing={2} direction={"row"}>
                <SupportAgent className="icon" />
                <Stack spacing={1}>
                    <p className="name h6">24/7 Support</p>
                    <p className="content h8 regular dark-lightest95">
                        Friendly 24/7 support
                    </p>
                </Stack>
            </Stack>

            <Stack className="stack" spacing={2} direction={"row"}>
                <CreditCard className="icon" />
                <Stack spacing={0.5}>
                    <p className="name h6">Secure Payment</p>
                    <p className="content h8 regular dark-lightest95">
                        All cards accepted
                    </p>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Benefit;
