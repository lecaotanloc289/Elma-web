import { Container, Rating, Stack } from "@mui/material";
import React from "react";
import "./Review.scss";
import { Star } from "@mui/icons-material";

const Review = (data) => {
    const item = data.data;

    return (
        <Container id="review" className="review" maxWidth="lg">
            <Stack className="stackreview" spacing={"2"}>
                <p className="review-name dark-title h22">Review</p>
                <Stack className="stack1review" direction={"row"}>
                    <Stack className="stack2review" spacing={2}>
                        <p className="forname">for {item.name}</p>
                        <Stack
                            className="bothreview flex"
                            direction={"row"}
                            spacing={1}
                        >
                            <Star className="iconstar" />
                            <p className="starview h2 medium ">{item.rating}</p>
                            <p className="view5 ">/ 5.0</p>
                        </Stack>
                        <p className="h81">Recommended</p>
                        <p className="forname">
                            (88%) Buyer recommended this product
                        </p>
                    </Stack>
                    <Stack className="stack3review" spacing={2}>
                        <Stack direction={"row"} spacing={2}>
                            <p className="h81">5.0 </p>
                            <Rating name="read-only" value={5} readOnly />
                            <p className="quantitystar h81 dark-lighter5a">
                                1.5k
                            </p>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <p className="h81">4.0 </p>
                            <Rating name="read-only" value={4} readOnly />
                            <p className="quantitystar h81 dark-lighter5a">
                                1.5k
                            </p>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <p className="h81">3.0 </p>
                            <Rating name="read-only" value={3} readOnly />
                            <p className="quantitystar h81 dark-lighter5a">
                                1.5k
                            </p>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <p className="h81">2.0 </p>
                            <Rating name="read-only" value={2} readOnly />
                            <p className="quantitystar h81 dark-lighter5a">
                                1.5k
                            </p>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <p className="h81">1.0 </p>
                            <Rating name="read-only" value={1} readOnly />
                            <p className="quantitystar h81 dark-lighter5a">
                                1.5k
                            </p>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Review;
