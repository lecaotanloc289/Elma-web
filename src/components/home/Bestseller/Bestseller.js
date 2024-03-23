import {
    Alert,
    Container,
    IconButton,
    Rating,
    Snackbar,
    Stack,
} from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import "./Bestseller.scss";
import { Favorite, ShoppingCart, Visibility } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { formattedNumber } from "../../../utils/appService";
import { addToCart } from "../../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Bestseller = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.data.products);
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) {
        userId = userData.id;
    }
    const bestSellerProduct = products.filter(
        (product) => product.isBestSeller,
    );

    // alert notify add product success
    const [open, setOpen] = useState(false);
    const handleAddToCart = async (productId) => {
        const product = {
            userId: userId,
            productId: productId,
            quantity: 1,
        };
        console.log(product);
        await dispatch(addToCart(product));
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    };
    return (
        <Container className="bestseller" maxWidth="lg">
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    variant="filled"
                    onClose={() => setOpen(false)}
                    severity="success"
                >
                    Add product to cart success!
                </Alert>
            </Snackbar>
            <Stack className="stack1">
                <p className="name h2">Best Seller Products</p>
                <p className="content content h8 regular dark-lightest95">
                    Check our best seller products on Elma website right now
                </p>
            </Stack>

            <Stack className="stack2">
                <Grid2
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 16 }}
                    maxWidth={"lg"}
                >
                    {bestSellerProduct.map((item) => {
                        return (
                            <Grid2 key={item._id} xs={2} sm={4} md={4}>
                                <Card variant="outlined" className="card-item">
                                    {/* HEADER */}
                                    <div>
                                        <Stack
                                            className="stackheader"
                                            direction={"row"}
                                        >
                                            <div className="csale">
                                                <p className="sale h9">SALE</p>
                                            </div>
                                            <IconButton className="heart">
                                                <Favorite />
                                            </IconButton>
                                        </Stack>
                                        {/* IMAGE */}
                                        <Stack className="img" spacing={1}>
                                            <img
                                                style={{ height: "180px" }}
                                                src={item.image}
                                                alt=""
                                            />
                                        </Stack>
                                        <Stack className="title" spacing={1}>
                                            <p className="cate">{`${item.category.name} - ${item.brand}`}</p>
                                            <p className="name">{item.name}</p>
                                            <Stack
                                                className="pr"
                                                direction={"row"}
                                            >
                                                <p className="price h7 medium indigo">
                                                    {formattedNumber(
                                                        item.price,
                                                    )}
                                                </p>
                                                <Rating
                                                    className="rating"
                                                    name="half-rating"
                                                    value={item.rating}
                                                    defaultValue={item.rating}
                                                    precision={0.1}
                                                    readOnly
                                                />
                                            </Stack>
                                        </Stack>
                                    </div>

                                    <Stack className="btncard" spacing={1}>
                                        <Button
                                            className="btn btn1"
                                            variant="contained"
                                            onClick={() =>
                                                handleAddToCart(item._id)
                                            }
                                        >
                                            <p className="normal h7 medium white">
                                                <ShoppingCart className="icon" />
                                                Add to cart
                                            </p>
                                        </Button>
                                        <Button
                                            className="btn "
                                            variant="outlined"
                                            onClick={() =>
                                                navigate(
                                                    `productdetails?id=${item._id}`,
                                                )
                                            }
                                        >
                                            <p className="normal h7 medium indigo">
                                                <Visibility className="icon" />
                                                Quick view
                                            </p>
                                        </Button>
                                    </Stack>
                                </Card>
                            </Grid2>
                        );
                    })}
                </Grid2>
            </Stack>
        </Container>
    );
};

export default Bestseller;
