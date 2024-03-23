import React from "react";
import "./TabProduct.scss";
import { Button, Container, Stack } from "@mui/material";
import { Description, Share } from "@mui/icons-material";

const TabProduct = () => {
    return (
        <Container className="tabproduct" maxWidth="lg">
            <Stack className="stacktab" direction={"row"}>
                <Stack className="stack1tab" direction={"row"}>
                    <Button variant="text ">
                        <p className="normal medium h41 indigo ">
                            Descriptions
                        </p>
                    </Button>
                    <Button href="#review" variant="text">
                        <p className="normal medium h41 ">Review (0)</p>
                    </Button>
                    <Button href="#relatedProduct" variant="text">
                        <p className="normal medium h41 "> Related Product</p>
                    </Button>
                </Stack>
                <Stack className="stack2tab" direction={"row"}>
                    <Button variant="text">
                        <Description className="tabicon dark-lightest95" />
                        <p className="normal medium h41 ">Report Product</p>
                    </Button>
                    <Button variant="text">
                        <Share className="tabicon dark-lightest95" />
                        <p className="normal medium h41 ">Share</p>
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default TabProduct;
