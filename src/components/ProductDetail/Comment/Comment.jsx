import {
    Avatar,
    Button,
    Container,
    Grid,
    Rating,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";
import "./Comment.scss";
import { images } from "../../../assets/images";

const items = [
    {
        Name: "Samsung Galaxy Watch 3",
        Category: "Men Fashion",
        Price: 172500,
        Rating: 5,
    },
    {
        Name: "Apple Watch 4 2020",
        Category: "Men Fashion",
        Price: 1999,
        Rating: 5,
    },
    {
        Name: "iPhone XS Max Pro",
        Category: "Men Fashion",
        Price: 1999,
        Rating: 5,
    },
];

const Comment = () => {
    return (
        <Container className="comments" maxWidth="lg">
            <p className="cmtname dark-title h61">All Comments</p>
            <Stack direction={"row"}>
                <Grid container spacing={2}>
                    {items.map((item) => {
                        return (
                            <Grid item xs={12}>
                                <Stack className="cmtstack1" spacing={2}>
                                    <Stack direction={"row"} spacing={2}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={images.Kim}
                                        />
                                        <Stack>
                                            <p className="cmtname dark-title h81">
                                                Daisy Murphy
                                            </p>
                                            <p className="cmtdate h81 dark-lightest95">
                                                July, 23 2020
                                            </p>
                                        </Stack>
                                        <Rating
                                            name="read-only"
                                            value={5}
                                            readOnly
                                        />
                                    </Stack>
                                    <p className="h8 regular dark-lighter5a">
                                        Sony α, is a camera system introduced on
                                        5 June 2006. It uses and expands upon
                                        Konica Minolta camera technologies,
                                        including the Minolta AF SLR lens mount…
                                        <Button>Reade more</Button>
                                    </p>
                                </Stack>
                            </Grid>
                        );
                    })}
                </Grid>
                <Stack className="cmtstack2" spacing={2}>
                    <p className="dark-title h61">Write your review</p>
                    <Stack spacing={1}>
                        <p className="">Your name *</p>
                        <TextField
                            id="outlined-basic"
                            label=""
                            className="input"
                            variant="outlined"
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <p className="">Your email</p>
                        <TextField
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                            className="input"
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <p className="">Choose rating</p>
                        <Rating
                            
                            className="cmtrating"
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                            size={"large"}
                        />
                    </Stack>
                    <Stack spacing={1}>
                        <p className="">Your review</p>
                        <TextField
                            className="input review"
                            id="outlined-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            placeholder="This product is..."
                        />
                    </Stack>

                    <Button className="cmtbtn1 indigo" variant="contained">
                        <p className="normal h7 medium white">Submit Review</p>
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Comment;
