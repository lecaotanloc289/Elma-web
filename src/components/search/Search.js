import {
    Alert,
    Button,
    ButtonGroup,
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
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    MenuItem,
    Pagination,
    Select,
    Snackbar,
    Stack,
} from "@mui/material";
import React, { useState } from "react";
import { ElmaBreadCrumbs } from "../categories/Categories";
import icons from "../../assets/icons";
import { ShoppingCart, StarRate } from "@mui/icons-material";
import "./Search.scss";
import { formattedNumber } from "../../utils/appService";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../MainLayout";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCart } from "../../redux/actions/cartAction";

function Search() {
    window.scrollTo(0, 0);
    return (
        <MainLayout>
            <Container maxWidth="lg">
                <Search1 />
                <Divider className="divider" />
                <Search2 />
                <div className="flex-center">
                    <Pagination
                        size="large"
                        count={10}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </Container>
        </MainLayout>
    );
}

export function Search1() {
    const searchValue = localStorage.getItem("searchValue");
    return (
        <Stack className="flex-row flex-space-between">
            <div>
                <ElmaBreadCrumbs />
                <p className="h2 medium">Search result for `{searchValue}`</p>
            </div>
            <Stack className="flex" direction={"row"} spacing={2}>
                <ButtonGroup variant="outlined">
                    <Button
                        className="dark-fill-light-background button44"
                        variant="contained"
                    >
                        <img src={icons.Grid} alt="" />
                    </Button>
                    <Button className="button44">
                        <img color="white" src={icons.List} alt="" />
                    </Button>
                </ButtonGroup>
                <Button
                    className="dark-fill-light-background button44 normal"
                    variant="contained"
                >
                    <img src={icons.Product} alt="" />
                    <p className="h81 regular ">Product</p>
                </Button>
                <Button
                    className=" button44 border-1-solid normal"
                    variant="outlined"
                >
                    <img src={icons.Store} alt="" />
                    <p className="h81 regular dark-lightest95">Store</p>
                </Button>
            </Stack>
        </Stack>
    );
}

export function Search2() {
    return (
        <Stack direction={"row"} spacing={4} className="search2">
            <FilterOptions />
            <Result />
        </Stack>
    );
}

export function FilterOptions() {
    const popular_filter = [
        { id: 1, label: "4 star or upper" },
        { id: 2, label: "Same day delivery" },
        { id: 3, label: "Super seller" },
        { id: 4, label: "Sale Product" },
    ];

    const price_value = [
        { id: 1, value: "0 - 150" },
        { id: 2, value: "150 - 300" },
        { id: 3, value: "300 - 500" },
        { id: 4, value: "500 - 1k" },
    ];
    const categories = useSelector((state) => {
        return state.data.categories;
    });
    const navigate = useNavigate();
    return (
        <Card className="radius-8 filter-options" variant="outlined">
            <Stack spacing={2}>
                <Stack>
                    <p className="h5 medium dark-title mgt4">Filter Options</p>
                    <Stack spacing={1}>
                        <p className="h7 medium dark-title mgt4">
                            Popular Filter
                        </p>
                        <FormGroup className="popular-options">
                            {popular_filter.map((item, index) => (
                                <FormControlLabel
                                    className="dark-lighter5a"
                                    control={<Checkbox size="large" />}
                                    label={item.label}
                                />
                            ))}
                        </FormGroup>
                    </Stack>
                </Stack>
                <Divider />
                <Stack spacing={2}>
                    <p className="h7 medium dark-title mgt4">Category</p>
                    {categories.map((item, index) => (
                        <a
                            onClick={() => navigate(`categories/${item._id}`)}
                            style={{
                                cursor: "pointer",
                                textDecoration: "none",
                            }}
                            className="normal"
                        >
                            <Stack
                                className="flex-space-between center"
                                direction={"row"}
                                spacing={2}
                            >
                                <Stack
                                    className="center"
                                    direction={"row"}
                                    spacing={1}
                                >
                                    <div>
                                        <img
                                            width={20}
                                            src={item.icon}
                                            alt=""
                                        />{" "}
                                    </div>
                                    <p className="h7 regular dark-lighter5a mgt4">
                                        {item.name}
                                    </p>
                                </Stack>
                                <img
                                    height={20}
                                    src={icons.Chevron_down}
                                    alt=""
                                />
                            </Stack>
                        </a>
                    ))}
                </Stack>
                <Divider />
                <Stack spacing={1}>
                    <p className="h7 medium dark-title mgt4">Price Value</p>
                    <Card className="height48">
                        <Button className="button-48-lighter">
                            <img src={icons.Dollar} alt="" />
                        </Button>
                        {/* <TextField
              placeholder="Set Min Price"
              className="input"
            ></TextField> */}
                    </Card>
                    <Card className="height48">
                        <Button className="button-48-lighter">
                            <img src={icons.Dollar} alt="" />
                        </Button>
                        {/* <TextField
              placeholder="Set Max Price"
              className="input"
            ></TextField> */}
                    </Card>
                    <Stack spacing={1}>
                        {price_value.map((i, ind) => (
                            <Button variant="outlined">
                                <p className="h8 regular dark-lighter95">
                                    {i.value}
                                </p>
                            </Button>
                        ))}
                    </Stack>
                </Stack>
                <Divider />
                <Stack spacing={1}>
                    <p className="h7 medium dark-title mgt4">Product Color</p>
                </Stack>
            </Stack>
        </Card>
    );
}

export function Result() {
    const [_filter, setFilter] = useState("");
    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <Container className="">
            <div className="flex-space-between center mg-16-0">
                {/* <p className="h7 regular dark-lighter5a">
                    Show 1 - 20 item from 500 total for `
                    {localStorage.getItem("searchValue")}`
                </p> */}
                <Stack
                    direction={"row"}
                    spacing={2}
                    style={{ whiteSpace: "nowrap" }}
                    className="sort"
                >
                    <p className="h7 regular dark-lighter95 mg14-0">
                        Sort by:{" "}
                    </p>
                    <FormControl fullWidth>
                        <Select
                            className="sort-by"
                            value={_filter}
                            label=""
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>
                                <p className="h7 medium dark-title">
                                    Highest rating
                                </p>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </div>

            <Store />
        </Container>
    );
}

export function Store() {
    // const store = [
    //     {
    //         name: "Apple Store Official",
    //         logo: logo.Apple,
    //         tag: "Featured store",
    //         sold: "10,5k",
    //         store_rating: 4.6,
    //     },
    // ];
    // const products = [
    //     {
    //         image: images.Macbook1,
    //         price: 1725,
    //         name: "Macbook Pro 2018",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook2,
    //         price: 1725,
    //         name: "Macbook Pro 2018",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook3,
    //         price: 1725,
    //         name: 'Macbook Pro 16"',
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook3,
    //         price: 1725,
    //         name: "Macbook Pro touchbar",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook2,
    //         price: 1725,
    //         name: "Macbook Pro MF840",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook1,
    //         price: 1725,
    //         name: "Macbook Pro 2018",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook2,
    //         price: 1725,
    //         name: "Macbook Pro 2018",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook3,
    //         price: 1725,
    //         name: "Macbook Pro 2018",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    //     {
    //         image: images.Macbook1,
    //         price: 1725,
    //         name: "Macbook Pro 2018",
    //         favorite: false,
    //         name_store: "Apple Store Official",
    //         rating: 4.6,
    //     },
    // ];

    // get user data from store
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData.id;

    // call product for search
    const searchResults = useSelector((state) => state.search.searchResults);
    const dispatch = useDispatch();

    const [openAdd, setOpenAdd] = useState(false);
    const handleAddToCart = async (productId) => {
        const product = {
            userId: userId,
            productId: productId,
            quantity: 1,
        };
        dispatch(addToCart(product));
        setOpenAdd(true);
        setTimeout(() => {
            setOpenAdd(false);
        }, 3000);
    };
    const navigate = useNavigate();

    // dialog add to cart
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid container spacing={2}>
            {/* STORE AND 2 RECOMMEND PRODUCTS */}
            <div>
                {/* {store.map((item, index) => (
                <Card variant="outlined" className="Store">
                    <Stack spacing={3} className="store">
                        <img width={64} src={item.logo} alt="" />

                        <Stack direction={"row"}>
                            <img src={icons.BestPrices} alt="" />
                            <p className="h8 regular green">{item.tag}</p>
                        </Stack>

                        <p className="h6 medium dark-title">{item.name}</p>
                        <Card className="white-fill-lighter" variant="none">
                            <Stack
                                className="flex-row store-info flex-space-between"
                                direction={"row"}
                                spacing={2}
                            >
                                <Stack className="center">
                                    <p className="h8 medium dark-title">
                                        {item.sold}
                                    </p>
                                    <p className="h9 regular dark-lightest95">
                                        Product sold
                                    </p>
                                </Stack>
                                <Stack>
                                    <Stack direction={"row"} className="center">
                                        <StarRate
                                            style={{ color: "yellow" }}
                                            className="star-rate"
                                        />
                                        <p className="h8 medium dark-title">
                                            {item.store_rating}
                                        </p>
                                    </Stack>
                                    <p className="h9 regular dark-lightest95">
                                        Store rating
                                    </p>
                                </Stack>
                            </Stack>
                        </Card>
                        <Button
                            variant="contained"
                            fullWidth
                            className="indigo-background h40"
                        >
                            <p className="normal h7 medium white">
                                {" "}
                                View Store
                            </p>
                        </Button>
                    </Stack>
                </Card>
            ))}

            {products.slice(0, 2).map((i, ind) => (
                <Grid item xs={4}>
                    <Card className="non-box-shadow radius-12 light-fill-green-background product-item">
                        <Stack spacing={2}>
                            <Stack spacing={2} className="center">
                                <img
                                    width={200}
                                    height={114}
                                    src={i.image}
                                    alt=""
                                />
                            </Stack>
                            <Stack
                                direction={"row"}
                                className="flex-space-between"
                            >
                                <p className="green h7 medium">
                                    ${formatNumber(i.price, "en-US", 2)}
                                </p>
                                <button className="button-none light-fill-green-background">
                                    <div className="favorite-product">
                                        <img src={icons.Love} alt="" />
                                    </div>
                                </button>
                            </Stack>
                            <p className="h6 medium dark-title product-name">
                                {i.name}
                            </p>
                            <Stack
                                direction={"row"}
                                className="flex-space-between"
                            >
                                <Stack direction={"row"} className="">
                                    <img height={16} src={icons.Store} alt="" />
                                    <p className="h9 regular dark-lighter5a">
                                        {i.name_store}
                                    </p>
                                </Stack>
                                <Stack direction={"row"}>
                                    <StarRate
                                        style={{ color: "yellow" }}
                                        className="star-rate"
                                    />
                                    <p className="h8 medium dark-title">
                                        {i.rating}
                                    </p>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            ))} */}
            </div>
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
            <Grid rowSpacing={3} container flexWrap={"wrap"}>
                {searchResults.map((i, ind) => (
                    <Grid item xs={4}>
                        <Card
                            variant="outlined"
                            className="non-box-shadow radius-12  product-item"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <button
                                    style={{ backgroundColor: "white" }}
                                    className="button-none favorite-button"
                                >
                                    <div className="favorite-product">
                                        <img src={icons.Love} alt="" />
                                    </div>
                                </button>
                            </div>
                            <Stack spacing={2}>
                                <CardActionArea
                                    onClick={() =>
                                        navigate(`/productdetails?id=${i._id}`)
                                    }
                                >
                                    <Stack spacing={2} className="center">
                                        <img
                                            className="product-image"
                                            src={i.image}
                                            alt=""
                                        />
                                    </Stack>

                                    <Stack
                                        direction={"row"}
                                        className="flex-space-between"
                                    >
                                        <p className="green h7 medium">
                                            {formattedNumber(i.price)}
                                        </p>

                                        <div className="csale">
                                            <p className="sale h9">SALE</p>
                                        </div>
                                    </Stack>
                                    <p className="h6 medium dark-title product-name text-ellipsis">
                                        {i.name}
                                    </p>
                                    <Stack
                                        direction={"row"}
                                        className="flex-space-between"
                                    >
                                        <Stack
                                            spacing={1}
                                            direction={"row"}
                                            className=""
                                        >
                                            <img
                                                height={16}
                                                src={icons.Store}
                                                alt=""
                                            />
                                            <p className="h9 regular dark-lighter5a">
                                                {i.brand}
                                            </p>
                                        </Stack>
                                        <Stack direction={"row"}>
                                            <StarRate
                                                style={{ color: "yellow" }}
                                                className="star-rate"
                                            />
                                            <p className="h8 medium dark-title">
                                                {i.rating}
                                            </p>
                                        </Stack>
                                    </Stack>
                                </CardActionArea>
                                <Button
                                    className="button-contained"
                                    variant="contained"
                                    onClick={() => handleAddToCart(i._id)}
                                >
                                    <p className="normal h7 medium white">
                                        <ShoppingCart className="icon" />
                                        Add to cart
                                    </p>
                                </Button>
                            </Stack>
                        </Card>

                        {/* ALERT DIALOG ADD TO CART */}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                        >
                            <DialogTitle id="responsive-dialog-title">
                                {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Let Google help apps determine location.
                                    This means sending anonymous location data
                                    to Google, even when no apps are running.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Disagree
                                </Button>
                                <Button onClick={handleClose} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default Search;
