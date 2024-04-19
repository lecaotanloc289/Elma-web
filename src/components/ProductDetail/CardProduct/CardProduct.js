import {
    Alert,
    Button,
    Container,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./CardProduct.scss";
import { ShoppingCart, StarRounded } from "@mui/icons-material";
import { formattedNumber } from "../../../utils/appService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "../../../redux/actions/cartAction";

const CardProduct = (data) => {
    const item = data.data;
    const specs = item.description.split("\n- ");

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const userData = useSelector((state) => state.auth.userData);

    // alert thông báo thêm sản phẩm thành công.
    const [open, setOpen] = useState(false);

    const handleAddToCart = (productId) => {
        let userId;
        if (userData) {
            userId = userData.id;
        }
        if (userId !== undefined) {
            const product = {
                userId: userId,
                productId: productId,
                quantity: quantity,
            };
            dispatch(addToCart(product));
            dispatch(fetchCart(userId));
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        } else {
            window.location.href = "/signin";
        }
    };

    return (
        <Container className="productdetail" maxWidth="lg">
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
            <div className="cardcontainer">
                <Stack className="stack" direction={"row"} spacing={10}>
                    <Stack className="stack1" spacing={2}>
                        <div className="img-product">
                            <img
                                className="imagecard"
                                src={item.image}
                                alt=""
                            />
                        </div>
                        {/* render khi get image product details */}
                        <Stack className="img-detail" direction={"row"}>
                            {item.images.map((image, index) => (
                                <div className="imagedetail" key={index}>
                                    <img
                                        className="image-detail"
                                        src={image}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </Stack>
                    </Stack>
                    <Stack className="stack2" spacing={2}>
                        <Stack spacing={2}>
                            <p className="title">
                                {`${item.name} - ${item.brand}`}
                            </p>
                            <Stack className="info" direction={"row"}>
                                <div className="inforbuy">
                                    <StarRounded className="iconstar" />
                                    {item.rating}
                                </div>
                                <p className="h81 dark-lightest95">
                                    0 Product sold
                                </p>
                                <p className="h81 dark-lightest95">
                                    3,1k Product watched
                                </p>
                            </Stack>

                            {specs.map((spec) => (
                                <p className="h8 regular dark-lighter5a">
                                    {spec}
                                </p>
                            ))}
                        </Stack>
                        <Stack className="stack4" direction={"row"} spacing={5}>
                            <Stack className="center" spacing={1}>
                                <p className="dark-lighter5a">Quantity</p>
                                <TextField
                                    className="input div input"
                                    id="outlined-number"
                                    label=""
                                    type="number"
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                    defaultValue={1}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{ min: 1 }}
                                />
                            </Stack>
                        </Stack>
                        <Stack
                            className="stack3"
                            direction={"row "}
                            spacing={2}
                        >
                            <p className="price h3">
                                {formattedNumber(item.price)}
                            </p>
                            <Stack direction={"row"} spacing={2}>
                                <Button
                                    className=" learn-more"
                                    variant="outlined"
                                >
                                    <p className="normal h7 medium indigo">
                                        Buy now
                                    </p>
                                </Button>
                                <Button
                                    onClick={() => handleAddToCart(item._id)}
                                    className=" btn1"
                                    variant="contained"
                                >
                                    <p className="normal h7 medium white">
                                        Add to cart
                                    </p>
                                    <ShoppingCart />
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        </Container>
    );
};

export default CardProduct;
