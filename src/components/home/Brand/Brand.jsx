import { Button, CardActionArea, Container, Grid, Stack } from "@mui/material";
import React from "react";
import { images } from "../../../assets/images";
import "./Brand.scss";

const item = [
    {
        img: images.Apple,
    },
    {
        img: images.Asus,
    },
    {
        img: images.Samsung,
    },
    {
        img: images.Sony,
    },
    {
        img: images.Wacom,
    },
    {
        img: images.Xiaomi,
    },
];

const Brand = () => {
    return (
        <Container maxWidth="lg">
            <Stack className="stack">
                <Grid container spacing={2}>
                    {item.map((item) => {
                        return (
                            <Grid item xs={2} spacing={1}>
                                <Stack className="card-item">
                                    <Stack className="img">
                                        <CardActionArea>
                                            <img
                                                className="image"
                                                src={item.img}
                                                alt=""
                                            />
                                        </CardActionArea>
                                    </Stack>
                                </Stack>
                            </Grid>
                        );
                    })}
                </Grid>
            </Stack>
        </Container>
    );
};

export default Brand;
