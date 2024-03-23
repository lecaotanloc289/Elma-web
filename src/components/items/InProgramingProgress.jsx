import { Stack } from "@mui/material";
import React from "react";
import { images } from "../../assets/images";

export const InProgramingProgress = () => {
    return (
        <Stack className="mg40 center" spacing={2}>
            <img width={500} src={images.PairPrograming} alt="" />
            <p className="h3 medium indigo">It's comming soon!</p>
        </Stack>
    );
};
