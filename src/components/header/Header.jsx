import React, { useEffect, useState } from "react";
import "./header.scss";
import Container from "@mui/material/Container";
import {
    Badge,
    Button,
    Divider,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Stack,
    TextField,
} from "@mui/material";
import icons from "../../assets/icons";
import CircleIcon from "../items/CircleIcon";
import Elma from "../items/Elma";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/actions/signInAction";
export default function Header() {
    const badge_style = {
        fontSize: "20px",
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // STATE SIGNIN
    const auth = useSelector((state) => state.auth);

    const handleSignOut = () => {
        dispatch(signOut);
        window.location.href = "/signin";
        localStorage.clear();
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // getting search value
    const [search, setSearchTerm] = useState("");
    // render data at search component
    // const searchTerm = useSelector((state) => state.search.searchTerm);
    if (search != "") {
        localStorage.setItem("searchValue", search);
    }
    useEffect(() => {
        dispatch(fetchSearchResults(localStorage.getItem("searchValue")));
    }, [dispatch, localStorage.getItem("searchValue")]);

    // Search button
    const handleSearch = (e) => {
        if (search === "") console.log(search);
        else navigate(`/search?key=${search}`);
    };

    // get cart quantity
    const cart = useSelector((state) => state.cart);
    let quantity;
    if (cart && cart.products) {
        quantity = cart.products.length;
    }

    return (
        <div>
            <Container maxWidth="lg">
                <Navbar />
            </Container>

            <Divider />

            <Container className="header" maxWidth="lg">
                <Stack className="header-2" spacing={2} direction={"row"}>
                    <Elma />

                    <Stack className="searching" direction={"row"}>
                        <TextField
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-field"
                        ></TextField>
                        <Button
                            className="search-button "
                            variant="contained"
                            onClick={handleSearch}
                        >
                            <img src={icons.Search} alt="" />
                        </Button>
                    </Stack>

                    <Stack spacing={1.5} direction={"row"}>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/cart")}
                        >
                            <div className="cart-icon">
                                <Badge
                                    className="red"
                                    badgeContent={quantity > 0 ? quantity : 0}
                                    color="error"
                                    style={badge_style}
                                >
                                    <img src={icons.Cart} alt="" />
                                </Badge>
                            </div>
                        </div>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/favorite")}
                        >
                            <CircleIcon link={icons.Love} children="" />
                        </div>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/user")}
                        >
                            <CircleIcon link={icons.User} children="" />
                        </div>
                        <Stack className="center" spacing={1}>
                            {auth.isAuthenticated ? (
                                <div>
                                    <p className="h7 medium dark-lighter">
                                        {auth.userData.name}
                                    </p>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className="normal"
                                        onClick={handleClick}
                                    >
                                        <p className="account h7 medium black">
                                            My Account
                                            <img
                                                src={icons.Chevron_down}
                                                alt=""
                                            />
                                        </p>
                                    </div>
                                    <div>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                "aria-labelledby":
                                                    "basic-button",
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                Profile
                                            </MenuItem>
                                            <MenuItem onClick={handleClose}>
                                                My account
                                            </MenuItem>
                                            <MenuItem onClick={handleSignOut}>
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <Button
                                        className="normal"
                                        onClick={() => navigate("/signin")}
                                    >
                                        <p className="normal account h7 medium black">
                                            Sign In
                                        </p>
                                    </Button>
                                    <Button
                                        onClick={() => navigate("/register")}
                                    >
                                        <p className="normal account h7 medium black">
                                            Register
                                        </p>
                                    </Button>
                                </div>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
