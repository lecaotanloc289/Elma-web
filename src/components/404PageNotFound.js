import React from "react";
import MainLayout from "./MainLayout";
import { images } from "../assets/images";
import { Stack } from "@mui/material";

export default function PageNotFound() {
    return (
        <MainLayout>
            <Stack spacing={2} className="center mg40">
                <img width={500} src={images.PageNotFound} alt="" />
                <p className="h3 medium dark-title">Oops! Page not found!</p>
            </Stack>
        </MainLayout>
    );
}
