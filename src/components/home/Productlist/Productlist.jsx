import {
    Button,
    CardActionArea,
    Container,
    Grid,
    Rating,
    Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Productlist.scss";
import { ChevronRightRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { formattedNumber } from "../../../utils/appService";
import { useNavigate } from "react-router-dom";

const list = [
    {
        Title: "Product list 1",
    },
    {
        Title: "Product list 2",
    },
    {
        Title: "Product list 3",
    },
];

const Productlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const products = useSelector((state) => state.data.products);
    const [randomProducts, setRandomProducts] = useState([]);

    // random product
    useEffect(() => {
        if (products.length > 0) {
            const numberOfRandomProducts = 9; // Số lượng sản phẩm ngẫu nhiên bạn muốn thêm
            const newRandomProducts = [];

            for (let i = 0; i < numberOfRandomProducts; i++) {
                const randomIndex = Math.floor(Math.random() * products.length);
                const randomProduct = products[randomIndex];
                newRandomProducts.push(randomProduct);
            }

            setRandomProducts((prevProducts) => [
                ...prevProducts,
                ...newRandomProducts,
            ]);
        }
    }, [products]);
    return (
        <Container className="productlist" maxWidth="lg">
            <Grid className="cnt" container spacing={2}>
                {list.map((items) => {
                    return (
                        <Grid xs={4}>
                            <Stack direction={"row"}>
                                <p className="title ">{items.Title}</p>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid className="grid2" container spacing={1}>
                {randomProducts.map((item) => {
                    return (
                        <Grid xs={4}>
                            <CardActionArea
                                onClick={() =>
                                    navigate(`productdetails?id=${item._id}`)
                                }
                            >
                                <Stack className="stackn" direction={"row"}>
                                    <Stack className=" image">
                                        <img
                                            width={10}
                                            className="img"
                                            src={item.image}
                                            alt=""
                                        />
                                    </Stack>
                                    <Stack spacing={0.5}>
                                        <p className="name text-ellipsis">
                                            {item.name}
                                        </p>
                                        <Stack
                                            className="pr"
                                            spacing={3}
                                            direction={"row"}
                                        >
                                            <p className="content h8 regular ">
                                                {formattedNumber(item.price)}
                                            </p>
                                            <Rating
                                                name="read-only"
                                                className="rating"
                                                value={item.rating}
                                                readOnly
                                                precision={0.2}
                                            />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardActionArea>
                        </Grid>
                    );
                })}
            </Grid>

            <Grid className="cnt2" container spacing={4}>
                {list.map((items) => {
                    return (
                        <Grid xs={4}>
                            <Stack direction={"row"}>
                                <Button
                                    onClick={() => navigate("/products")}
                                    className="btn1"
                                    variant="text"
                                >
                                    <p className="normal h7 medium indigo">
                                        View More Products…
                                    </p>
                                    <ChevronRightRounded className="icon indigo" />
                                </Button>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Productlist;
