import { Button, Container, Stack } from "@mui/material";
import React from "react";
import { images } from "../../../assets/images";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import "./Banner.scss";

const Banner = () => {
    return (
        <Container className="banner" maxWidth="lg">
            <Stack className="stack1" spacing={3.5}>
                <p className="tag h81 ">SONY WH-H910N</p>
                <p className="nametag h2 medium">
                    Best in Hi-Res and Noise Cancelling
                </p>
                <p className="contenttag h8 regular dark-lightest95">
                    Experience finely tuned noise-canceling performance in a
                    comfortable headphone. Long-lasting battery life plus quick
                    charging keeps you listening for up to 35 hours since start.
                </p>
                <Stack direction={"row"} spacing={2}>
                    <Button className=" btn1" variant="contained">
                        <p className="normal h7 medium white">
                            Buy Now for $234
                        </p>
                    </Button>
                    <Button className=" learn-more" variant="outlined">
                        <p className="normal h7 medium indigo">Learn More</p>
                    </Button>
                </Stack>
            </Stack>

            <Stack className="stack2" direction={"row"}>
                <img className="img" width="372px" src={images.Image} alt="" />
            </Stack>
            <Button className="arrow">
                <ArrowForwardIosOutlinedIcon className="icon" />
            </Button>
        </Container>
    );
};

export default Banner;
