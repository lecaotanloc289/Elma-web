/* eslint-disable react-hooks/exhaustive-deps */
import { Star } from "@mui/icons-material";
import {
    Alert,
    Button,
    Card,
    CardActionArea,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import "./Cart.scss";
import { formattedNumber } from "../../utils/appService";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    decreaseQuantity,
    fetchCart,
    increaseQuantity,
    removeFromCart,
    saveNote,
    updateNote,
} from "../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
export function CartBody({ handleComplete }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const discount = 0;
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData.id;
    const cart = useSelector((state) => state.cart);
    let products = [];

    if (cart) {
        products = cart.products;
    }

    // handle increase quantity & decrease quantity
    const handleIncrease = async (productId) => {
        const product = {
            userId: userId,
            productId: productId,
        };
        await dispatch(increaseQuantity(product));
        dispatch(fetchCart(userId));
    };

    const handleDecrease = (productId) => {
        const product = {
            userId: "",
            productId: "",
        };
        products.forEach(async (item) => {
            if (item.productId._id === productId && item.quantity > 1) {
                product.userId = userId;
                product.productId = productId;
                await dispatch(decreaseQuantity(product));
                dispatch(fetchCart(userId));
            }
        });
    };

    // CONFIRM DELETE PRODUCT FROM CART
    const handleDelete = async (productId) => {
        const product = {
            userId: userId,
            productId: productId,
        };
        dispatch(removeFromCart(product));
        handleCloseDialog(productId);
    };
    const [openDialogs, setOpenDialogs] = useState({});
    // open dialog
    const handleOpenDialog = (productId) => {
        setOpenDialogs((prevState) => ({
            ...prevState,
            [productId]: true,
        }));
    };
    // close dialog
    const handleCloseDialog = (productId) => {
        setOpenDialogs((prevState) => ({
            ...prevState,
            [productId]: false,
        }));
    };

    // RECOMMEND PRODUCTS
    const recommend = useSelector((state) => state.data.products);
    const [randomProducts, setRandomProducts] = useState([]);

    // ALERT ADD TO CART SUCCESS
    const [openAdd, setOpenAdd] = useState(false);
    const handleAddToCart = async (productId) => {
        let userId;
        if (userData) {
            userId = userData.id;
        }
        const product = {
            userId: userId,
            productId: productId,
            quantity: 1,
        };
        await dispatch(addToCart(product));
        dispatch(fetchCart(userId));
        setOpenAdd(true);
        setTimeout(() => {
            setOpenAdd(false);
        }, 3000);
    };

    // SAVE SELECTED PRODUCT AND RE-RENDER CHECKBOX
    const storedSelectedProducts = JSON.parse(
        localStorage.getItem("selectedProducts"),
    );

    // SELECT & SELECT ALL PRODUCT
    const [selectedProducts, setSelectedProducts] = useState(
        storedSelectedProducts?.map((product) => product.productId._id) || [],
    );
    const [selectAll, setSelectAll] = useState(
        storedSelectedProducts?.length === products.length,
    );

    // checkbox change state
    const handleCheckboxChange = (productId) => {
        setSelectedProducts((prevState) => {
            prevState = prevState || []; // Ensure prevState is an array
            if (prevState.includes(productId)) {
                return prevState.filter((id) => id !== productId);
            } else {
                return [...prevState, productId];
            }
        });
    };

    // checkbox "Select All" change state
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(
                products.map((product) => product.productId._id),
            );
        }
        setSelectAll((prevState) => !prevState);
    };

    // CACULATE TOTAL
    const total = products.reduce((total, product) => {
        if (selectedProducts?.includes(product.productId._id)) {
            return total + product.productId.price * product.quantity;
        }
        return total;
    }, 0);

    // CACULATE QUANTITY CART ITEM CHECK
    const selectedProductCount = selectedProducts?.length;

    const selectedProductsData = products.filter((product) =>
        selectedProducts?.includes(product.productId._id),
    );
    localStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProductsData),
    );

    // random recommend product
    useEffect(() => {
        window.scrollTo(0, 0);

        if (recommend.length > 0) {
            const numberOfRandomProducts = 5; // Số lượng sản phẩm ngẫu nhiên bạn muốn thêm
            const newRandomProducts = [];

            for (let i = 0; i < numberOfRandomProducts; i++) {
                const randomIndex = Math.floor(
                    Math.random() * recommend.length,
                );
                const randomProduct = recommend[randomIndex];
                newRandomProducts.push(randomProduct);
            }

            setRandomProducts(newRandomProducts);
        }
    }, [recommend]);

    // get note and render
    const note = useSelector((state) => state.notes.note);

    // GET GOSHIP TOKEN
    const goshipToken = useSelector((state) => state.goship.token);
    // console.log(goshipToken);
    return (
        <Container maxWidth="lg">
            {/* NOTIFICATION ADD CART */}
            <Snackbar
                open={openAdd}
                autoHideDuration={3000}
                onClose={() => setOpenAdd(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    variant="filled"
                    onClose={() => setOpenAdd(false)}
                    severity="success"
                >
                    Add product to cart success!
                </Alert>
            </Snackbar>
            {/* width: fit-content;
    height: max-content;
    margin-left: -24px;
    padding-left: 28px;
    margin-right: 36px; */}
            {/* PRODUCT IN CART & VOUCHER & TOTAL SUMMARY*/}
            <Stack direction={"row"} spacing={4} className="flex-space-between">
                {/* PRODUCT IN CART  */}
                <Card
                    className="non-box-shadow mg40"
                    style={{
                        margin: "40px 24px 40px -24px",
                        padding: "10px 20px 0 30px",
                    }}
                >
                    <Stack className="" spacing={4}>
                        <div className="">
                            <Checkbox
                                className="checkbox"
                                size="large"
                                name="selectAll"
                                id="selectAll"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                            />
                            <label
                                className="h6 regular dark-title"
                                style={{ cursor: "pointer" }}
                                htmlFor="selectAll"
                            >
                                Select all
                            </label>
                        </div>
                        {products ? (
                            products.map((i) => (
                                <div className="cart-product">
                                    <Grid
                                        container
                                        spacing={2}
                                        className="center"
                                    >
                                        <Grid className="flex-row" xs={3}>
                                            <Checkbox
                                                className="checkbox"
                                                size="large"
                                                checked={selectedProducts?.includes(
                                                    i.productId._id,
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        i.productId._id,
                                                    )
                                                }
                                            />
                                            <div className="image-container center">
                                                <img
                                                    width={120}
                                                    className="product-image"
                                                    src={i.productId.image}
                                                    alt=""
                                                />
                                            </div>
                                        </Grid>
                                        <Grid xs={4}>
                                            <div>
                                                <p className="h7 medium dark-title">
                                                    {i.productId.name}
                                                </p>
                                                <p className="h8 regular dark-lightest95">
                                                    {i.productId.brand}
                                                </p>
                                            </div>
                                        </Grid>
                                        <Grid xs={2}>
                                            <p
                                                style={{ lineHeight: "32px" }}
                                                className="h7 medium green product-price"
                                            >
                                                {formattedNumber(
                                                    i.productId.price,
                                                )}
                                            </p>
                                        </Grid>
                                        <Grid xs={2}>
                                            <Stack
                                                spacing={1}
                                                direction={"row"}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        handleDecrease(
                                                            i.productId._id,
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={icons.Minus}
                                                        alt=""
                                                    />
                                                </IconButton>
                                                <p className="h8 medium dark-title product-quantity">
                                                    {i.quantity}
                                                </p>
                                                <IconButton
                                                    onClick={() =>
                                                        handleIncrease(
                                                            i.productId._id,
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={icons.Add}
                                                        alt=""
                                                    />
                                                </IconButton>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={1}>
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenDialog(
                                                        i.productId._id,
                                                    )
                                                }
                                                className="delete-product"
                                            >
                                                <img src={icons.Trash} alt="" />
                                            </IconButton>
                                        </Grid>
                                    </Grid>

                                    <Dialog
                                        open={
                                            openDialogs[i.productId._id] ||
                                            false
                                        }
                                        onClose={() =>
                                            handleCloseDialog(i.productId._id)
                                        }
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            <p className="h5 regular dark-title">
                                                {"Confirm remove product?"}
                                            </p>
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText
                                                className="h6 regular dark-title"
                                                id="alert-dialog-description"
                                            >
                                                <p className="h8 regular dark-title">
                                                    Are you sure remove{" "}
                                                    {i.productId.name}?
                                                </p>
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={() =>
                                                    handleCloseDialog(
                                                        i.productId._id,
                                                    )
                                                }
                                            >
                                                Disagree
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleDelete(
                                                        i.productId._id,
                                                    )
                                                }
                                            >
                                                Agree
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            ))
                        ) : (
                            <> </>
                        )}
                    </Stack>
                </Card>

                {/* VOUCHER & TOTAL SUMMARY */}
                <Card
                    className="non-box-shadow mg40"
                    style={{
                        padding: 20,
                        marginRight: -24,
                    }}
                >
                    <Stack spacing={3}>
                        <div>
                            <p className="h6 medium dark-title mg20">
                                Have a voucher?
                            </p>
                            <Stack direction={"row"} spacing={2}>
                                <TextField className="input"></TextField>
                                <Button
                                    variant="contained"
                                    className="dark-fill-light-background apply-voucher"
                                >
                                    <p className="h8 medium white normal ">
                                        Apply
                                    </p>
                                </Button>
                            </Stack>
                        </div>
                        <Stack spacing={2}>
                            <p className="h6 medium dark-title mg10">
                                Order Summary
                            </p>
                            <div className="flex-space-between">
                                <p className="h7 regular dark-lightest95">
                                    Price
                                </p>
                                <p className="h7 regular dark-title">
                                    {formattedNumber(total)}
                                </p>
                            </div>
                            <div className="flex-space-between">
                                <p className="h7 regular dark-lightest95">
                                    Discount {discount}%
                                </p>
                                <p className="h7 regular red">
                                    -{" "}
                                    {formattedNumber((total * discount) / 100)}
                                </p>
                            </div>
                            <div className="flex-space-between">
                                <p className="h7 regular dark-lightest95">
                                    Total Price
                                </p>
                                <p className="h7 bold dark-title">
                                    {formattedNumber(
                                        total * (1 - discount / 100),
                                    )}
                                </p>
                            </div>
                        </Stack>
                        <Divider />
                        <div>
                            <p className="h8 medium dark-lightest95">
                                Write a note
                            </p>
                        </div>
                        <TextField
                            multiline
                            rows={4}
                            className="input"
                            placeholder="Fragile item, Electronics etc"
                            value={note}
                            onChange={(e) => {
                                dispatch(updateNote(e.target.value));
                                dispatch(saveNote(e.target.value));
                            }}
                        ></TextField>
                        {selectedProductCount > 0 ? (
                            <Button
                                variant="contained"
                                className="button-contained"
                                style={{ marginTop: "100px" }}
                                onClick={handleComplete}
                            >
                                <img src={icons.Shipping_white} alt="" />
                                <p className="normal h7 medium white">
                                    Continue to Shipping
                                </p>
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                className="button-outlineted"
                                style={{ marginTop: "100px", height: "48px" }}
                                disabled
                                onClick={handleComplete}
                            >
                                <img
                                    style={{ width: "20px", margin: "4px" }}
                                    src={icons.Card_white}
                                    alt=""
                                />
                                <p className="normal h7 regular white">
                                    Proceed to Checkout
                                </p>
                            </Button>
                        )}
                    </Stack>
                </Card>
            </Stack>

            {/* RECOMMEND PRODUCTS */}
            <div className="mg40">
                <div className="flex-space-between center">
                    <p className="h4 medium dark-title">
                        Maybe you like it too...
                    </p>
                    <Button variant="outlined" className="button-outlined">
                        <p className="indigo h7 regular normal">View All</p>
                    </Button>
                </div>
                <Stack className="mg40" direction={"row"} spacing={8}>
                    {randomProducts.map((item, index) => (
                        <Stack minWidth={150} maxWidth={200} spacing={2}>
                            <CardActionArea
                                style={{ minHeight: 200 }}
                                onClick={() =>
                                    navigate(`/productdetails?id=${item._id}`)
                                }
                                className="image-container flex-center"
                            >
                                <img
                                    style={{ minWidth: 80 }}
                                    className="image-product"
                                    src={item.image}
                                    alt=""
                                />
                            </CardActionArea>
                            <p className="textwrap3line h8 medium dark-title">
                                {item.name}
                            </p>
                            <div className="flex-space-between flex-row">
                                <p className="green h8 regular">
                                    {formattedNumber(item.price)}
                                </p>
                                <div className="flex-row">
                                    <Star color="warning" />
                                    <p className="dark-lighter5a h8 regular">
                                        {item.rating}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={() => handleAddToCart(item._id)}
                                fullWidth
                                variant="outlined"
                                className=" mg40 button-outlined"
                            >
                                <p className="indigo h7 regular normal">
                                    Add to cart
                                </p>
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </div>
        </Container>
    );
}
