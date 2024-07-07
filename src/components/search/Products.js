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
    IconButton,
    MenuItem,
    Select,
    Snackbar,
    Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import icons from "../../assets/icons";
import { Favorite, ShoppingCart, StarRate } from "@mui/icons-material";
import "./Search.scss";
import { formattedNumber } from "../../utils/appService";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../MainLayout";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartAction";
import queryString from "query-string";
import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";

function Products() {
    window.scrollTo(0, 0);
    return (
        <MainLayout>
            <Container maxWidth="lg">
                <Search1 />
                <Divider className="divider" />
                <Search2 />
            </Container>
        </MainLayout>
    );
}

export function Search1() {
    const [_filter, setFilter] = useState("");
    const handleChange = (event) => {
        setFilter(event.target.value);
    };
    return (
        <Stack className="flex-row flex-space-between">
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
            <FormControl>
                <Stack
                    direction={"row"}
                    spacing={2}
                    style={{ whiteSpace: "nowrap" }}
                    className="sort"
                >
                    <p className="h7 regular dark-lighter95 mg14-0">
                        Sort by:{" "}
                    </p>
                </Stack>
                <Select
                    className="sort-by"
                    value={_filter}
                    label=""
                    onChange={handleChange}
                >
                    <MenuItem value={1}>
                        <p className="h7 medium dark-title">Highest rating</p>
                    </MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}

export function Search2() {
    return (
        <Stack direction={"row"} spacing={4} className="search2">
            <FilterOptions />
            <Store />
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
                            href="#dsa"
                            onClick={() => navigate(`?category=${item._id}`)}
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
                    </Card>
                    <Card className="height48">
                        <Button className="button-48-lighter">
                            <img src={icons.Dollar} alt="" />
                        </Button>
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

export function Store() {
    // get user data from store
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData.id;

    // call product for search
    const category = queryString.parse(window.location.search).category;
    const [productsOfCategory, setProductsOfCategory] = useState(null);
    useEffect(() => {
        const getProductByCategory = async () => {
            window.scrollTo(0, 0);
            if (category !== undefined) {
                try {
                    const res = await axios.get(
                        `${API_PUBLIC_URL}products/category/${category}`,
                    );
                    console.log(res.data);
                    setProductsOfCategory(res.data);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getProductByCategory();
    }, [category]);
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

    // FAVORITE PRODUCTS
    const products = useSelector((state) => state.data.products);
    const [favorites, setFavorites] = useState([]);
    if (favorites) {
    }
    // useEffect(() => {
    //     axios
    //         .get(`${API_PUBLIC_URL}users/${userId}`)
    //         .then((res) => {
    //             setFavorites(res.data.likedProducts);
    //         })
    //         .catch((error) => console.log(error));
    // });
    const toggleFavorite = async (productId) => {
        try {
            const res = await axios.put(
                `${API_PUBLIC_URL}users/favorite/${userId}/${productId}`,
            );
            if (res.status === 200) {
                setFavorites(res.data.likedProducts);
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const isLikeProduct = (productId) => {
    //     return favorites.includes(productId);
    // };
    return (
        <Grid container spacing={2}>
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
                {productsOfCategory !== null
                    ? productsOfCategory?.map((i, ind) => (
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
                                      <Button
                                          onClick={() => {
                                              toggleFavorite(i._id);
                                          }}
                                          style={{ color: "red" }}
                                      >
                                          <Favorite color="error" />
                                      </Button>
                                  </div>
                                  <Stack className="mg10" spacing={2}>
                                      <CardActionArea
                                          onClick={() =>
                                              navigate(
                                                  `/productdetails?id=${i._id}`,
                                              )
                                          }
                                      >
                                          <Stack spacing={1}>
                                              <Stack className="center">
                                                  <img
                                                      style={{ minHeight: 197 }}
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
                                                      <p className="sale h9">
                                                          SALE
                                                      </p>
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
                                                          style={{
                                                              color: "yellow",
                                                          }}
                                                          className="star-rate"
                                                      />
                                                      <p className="h8 medium dark-title">
                                                          {i.rating}
                                                      </p>
                                                  </Stack>
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
                                          Let Google help apps determine
                                          location. This means sending anonymous
                                          location data to Google, even when no
                                          apps are running.
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
                      ))
                    : products.map((i, ind) => (
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
                                      <IconButton className="heart">
                                          <Favorite />
                                      </IconButton>
                                  </div>
                                  <Stack className="mg10" spacing={2}>
                                      <CardActionArea
                                          onClick={() =>
                                              navigate(
                                                  `/productdetails?id=${i._id}`,
                                              )
                                          }
                                      >
                                          <Stack spacing={1}>
                                              <Stack className="center">
                                                  <img
                                                      style={{ minHeight: 197 }}
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
                                                      <p className="sale h9">
                                                          SALE
                                                      </p>
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
                                                          style={{
                                                              color: "yellow",
                                                          }}
                                                          className="star-rate"
                                                      />
                                                      <p className="h8 medium dark-title">
                                                          {i.rating}
                                                      </p>
                                                  </Stack>
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
                                          Let Google help apps determine
                                          location. This means sending anonymous
                                          location data to Google, even when no
                                          apps are running.
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

export default Products;
