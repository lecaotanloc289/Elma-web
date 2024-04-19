import * as React from "react";
import { useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Button, Container, Stack } from "@mui/material";
import "./Slide.scss";
import { useDispatch, useSelector } from "react-redux";
import { formattedNumber } from "../../utils/appService";
import { addToCart } from "../../redux/actions/cartAction";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Slide() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const handleStepChange = (step) => {
        setActiveStep(step);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const product = useSelector((state) => state.data.products);
    const products = product.filter((product) => product.isBestSeller);
    const handleAddToCart = (productId) => {
        let userId;
        if (userData) {
            userId = userData.id;
        }
        if (userId !== undefined) {
            const product = {
                userId: userId,
                productId: productId,
                quantity: 1,
            };
            dispatch(addToCart(product));
            message.success("Add to cart success!");
        } else {
            window.location.href = "/signin";
        }
    };
    const handleViewDetail = (productId) => {
        navigate(`/productdetails?id=${productId}`);
    };
    return (
        <Container maxWidth="lg">
            <Container
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItem: "center",
                    flexDirection: "column",
                }}
                className="mg40"
            >
                <Stack className="banner" direction={"row"} spacing={20}>
                    <Stack className="stack1" spacing={3.5}>
                        <p className="tag h81 ">
                            {products[activeStep]?.brand}
                        </p>
                        <p style={{ width: 520 }} className="nametag h2 medium">
                            {products[activeStep]?.name}
                        </p>
                        <p className="contenttag h8 regular dark-lightest95">
                            {products[activeStep]?.description}
                        </p>
                        <Stack direction={"row"} spacing={2}>
                            <Button
                                onClick={() =>
                                    handleAddToCart(products[activeStep]._id)
                                }
                                className=" btn1"
                                variant="contained"
                            >
                                <p className="normal h7 medium white">
                                    Add to cart for{" "}
                                    {formattedNumber(
                                        products[activeStep]?.price,
                                    )}
                                </p>
                            </Button>
                            <Button
                                onClick={() =>
                                    handleViewDetail(products[activeStep]._id)
                                }
                                className=" learn-more"
                                variant="outlined"
                            >
                                <p className="normal h7 medium indigo">
                                    View details
                                </p>
                            </Button>
                        </Stack>
                    </Stack>

                    <AutoPlaySwipeableViews
                        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {products.map((step, index) => (
                            <div>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Stack direction={"row"}>
                                        <img
                                            className="img"
                                            width="372px"
                                            src={products[activeStep].image}
                                            alt=""
                                        />
                                    </Stack>
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                </Stack>
            </Container>
        </Container>
    );
}

export default Slide;
