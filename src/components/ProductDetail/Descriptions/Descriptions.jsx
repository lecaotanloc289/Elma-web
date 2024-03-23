import React from "react";
import "./Descriptions.scss";
import { Container, Grid, Stack, Typography } from "@mui/material";

const items = [
    {
        viewname: "Brand",
        viewcontent: "Sony Alpha 7 Mark II",
    },
    {
        viewname: "Resolution",
        viewcontent: "42MP Full-Frame Exmor R BSI CMOS Sensor",
    },
    {
        viewname: "Video",
        viewcontent: "UHD 4K30p Video with HLG & S-Log3 Gammas",
    },
    {
        viewname: "Connectivity",
        viewcontent: "Built-In Wi-Fi/Bluetooth, Dual SD Slots",
    },
    {
        viewname: "Screen",
        viewcontent: "3.69m-Dot Tru-Finder OLED EVF",
    },
];

const Descriptions = (data) => {
    const item = data.data;
    // overview
    const overview = item.description.split("\n").reduce((acc, item) => {
        const label = item.split(":")[0].trim();
        const value = item.split(":")[1];
        acc.push({ label, value });
        return acc;
    }, []);
    overview.unshift({ label: "Brand", value: item.brand });

    return (
        <Container className="Descriptions" maxWidth="lg">
            <Stack className="desstack">
                <Stack className="desstack1">
                    <p className="normal medium h41 dark-lighter5a">
                        {/* Sony α, is a camera system introduced on 5 June 2006. It
                        uses and expands upon Konica Minolta camera
                        technologies, including the Minolta AF SLR lens mount,
                        whose assets were acquired by Sony after the end of
                        Konica Minolta's photography operations in early 2006. */}
                        {item.description}
                    </p>
                </Stack>
                <Stack className="desstack2" spacing={2}>
                    <p className="desoverview h61">Overview</p>
                    <Grid container spacing={2}>
                        {overview.map((item, index) => (
                            <Grid
                                container
                                xs={12}
                                key={index}
                                justifyContent="space-between"
                            >
                                <Grid xs={1}>
                                    <Typography
                                        variant="subtitle1"
                                        className="nameview normal medium h41"
                                    >
                                        {item.label}:
                                    </Typography>
                                </Grid>
                                <Grid item xs={10.5}>
                                    <Typography
                                        variant="body1"
                                        className="contentview"
                                    >
                                        {item.value}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Stack>
                <Stack className="desstack3"></Stack>
            </Stack>
        </Container>
    );
};

export default Descriptions;
