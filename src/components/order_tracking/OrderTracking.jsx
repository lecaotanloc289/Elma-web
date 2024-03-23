import React, { useEffect, useState } from "react";
import {
    Backdrop,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    IconButton,
    Radio,
    Stack,
    Typography,
} from "@mui/material";
import {
    Call,
    ChevronLeftRounded,
    ExpandMoreRounded,
} from "@mui/icons-material";
import icons from "../../assets/icons";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "./OrderTracking.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { images } from "../../assets/images";
import { formattedDate, formattedNumber } from "../../utils/appService";
import MainLayout from "../MainLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_PUBLIC_URL } from "../../utils/config";
import axios from "axios";
import PageNotFound from "../404PageNotFound";
import { InProgramingProgress } from "../items/InProgramingProgress";
const steps = ["Order payed", "Packed", "On shipping", "Received", "Review"];
const recommend_product = [
    {
        image: images.clock,
        name: "Garmin Watch Fit X",
        price: 1725,
        rate: 4.6,
    },
    {
        image: images.clock1,
        name: "Garmin Watch Fit X",
        price: 1725,
        rate: 4.6,
    },
    {
        image: images.iphone,
        name: "Garmin Watch Fit X",
        price: 1725,
        rate: 4.6,
    },
    {
        image: images.sweat,
        name: "Garmin Watch Fit X",
        price: 1725,
        rate: 4.6,
    },
    {
        image: images.Bitmap,
        name: "Garmin Watch Fit X",
        price: 1725,
        rate: 4.6,
    },
    {
        image: images.lap,
        name: "Garmin Watch Fit X",
        price: 1725,
        rate: 4.6,
    },
];
export function OrderTrackingStepper() {
    return (
        <Box className="step1" sx={{ width: "100%" }}>
            <Stepper className="step2" activeStep={2} alternativeLabel>
                {steps.map((label) => (
                    <Step className="step3" key={label}>
                        <StepLabel className="step4">{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
function OrderTracking() {
    const items = [1, 2, 3, 4, 5];
    const [expanded, setExpanded] = useState({});

    const handleChange = (panel) => {
        setExpanded({
            ...expanded,
            [panel]: expanded[panel] ? false : true,
        });
    };
    const userData = useSelector((state) => state.auth.userData);
    let userId;
    if (userData) userId = userData.id;
    const [orders, setOrders] = useState(null);
    console.log(orders);
    
    useEffect(() => {
        const getOrders = async (userId) => {
            try {
                const response = await axios.get(
                    `${API_PUBLIC_URL}orders/${userId}`,
                );
                console.log(response.data);
                setOrders(response.data);
            } catch (error) {
                console.log("Get orders by user id error: ", error);
            }
        };
        getOrders(userId);
    }, [userId]);
    return (
        <MainLayout>
            <Container maxWidth="lg">
                <OrderTrackingHeader />
                <div className="mg40">
                    {orders ? (
                        orders.map((item, index) => (
                            <Accordion
                                key={index}
                                expanded={expanded[`panel${index + 1}`]}
                                onChange={() =>
                                    handleChange(`panel${index + 1}`)
                                }
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreRounded />}
                                    aria-controls={`panel${index + 1}-content`}
                                    id={`panel${index + 1}-header`}
                                >
                                    <Stack direction={"row"} spacing={47}>
                                        <div className="flex-row">
                                            <div
                                                style={{ margin: "0 20px" }}
                                                className="flex center"
                                            >
                                                <p className="normal h7 medium ">
                                                    Order ID:{" "}
                                                </p>
                                                <div className="flex center">
                                                    <p
                                                        style={{
                                                            margin: "10px 0 10px 10px",
                                                        }}
                                                        className="h8 regular dark-lighter5a"
                                                    >
                                                        {item._id}
                                                    </p>
                                                </div>
                                                <IconButton>
                                                    <img
                                                        height={20}
                                                        src={icons.Copy}
                                                        alt=""
                                                    />
                                                </IconButton>
                                            </div>
                                            <div className="flex center">
                                                <p className="normal h7 medium ">
                                                    Time order:{" "}
                                                </p>
                                                <div className="flex center">
                                                    <p
                                                        style={{
                                                            margin: "10px 0 10px 10px",
                                                        }}
                                                        className="h8 regular dark-lighter5a"
                                                    >
                                                        {formattedDate(
                                                            item.dateOrdered,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex center">
                                                <p className="normal h7 medium ">
                                                    Status:{" "}
                                                </p>
                                                <div className="flex center">
                                                    <p
                                                        style={{
                                                            margin: "10px 0 10px 10px",
                                                        }}
                                                        className="h8 regular dark-lighter5a"
                                                    >
                                                        {item.status}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Container className="flex-space-between">
                                        <YourPackageIn orders={item} />
                                        <InsidePackage orders={item} />
                                    </Container>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    ) : (
                        <Stack height={200} className="flex-center">
                            <CircularProgress className="center" />
                            <p className="h3 medium dark-title">Loading...</p>
                        </Stack>
                    )}
                </div>
            </Container>
        </MainLayout>
    );
}

function OrderTrackingHeader() {
    const navigate = useNavigate();
    return (
        <Stack direction={"row"} className="flex-space-between center mg20">
            <div>
                <p className="h2 medium dark-title ">Order Tracking</p>
            </div>
            <Button
                onClick={() => navigate("/")}
                className="button-outlined"
                variant="outlined"
            >
                <img height={20} src={icons.Home} alt="" />
                <p className="normal h7 medium indigo">Go to Homepage</p>
            </Button>
        </Stack>
    );
}

function YourPackageIn(orders) {
    const orderDetail = orders.orders;
    const trackdetail = [
        {
            title: "Order confirmed by Seller & Elma system",
            date: "16 Jul 2024",
            time: "08:00 PM",
        },
        {
            title: "Package received on DHL New York city",
            date: "17 Jul 2024",
            time: "08:00 PM",
        },
        {
            title: "Package send from DHL New York city",
            date: "17 Jul 2024",
            time: "10:00 PM",
        },
        {
            title: "Package arrive on DHL Washington DC",
            date: "18 Jul 2024",
            time: "07:00 AM",
        },
        {
            title: "Package will send to your home by our courier (James)",
            date: "18 Jul 2024",
            time: "11:00 AM",
        },
    ];
    return (
        <Container>
            {/* Section 1 */}
            <Stack
                width={700}
                direction={"row"}
                className="flex-space-between center"
            >
                <div>
                    <p className="h5 medium dark-title ">Your package in..</p>
                    <p className="h7 regular dark-lightest95 mgt4">
                        Will sent to 5690 Matilda Green Suite 627, New York,
                        12345
                    </p>
                </div>
            </Stack>
            <OrderTrackingStepper />
            <Accordion defaultExpanded className="mg40 non-box-shadow">
                <AccordionSummary
                    expandIcon={<ExpandMoreRounded />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <p className="h7 medium dark-title">Track details</p>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={3}>
                        {trackdetail.map((item, index) => (
                            <div className="flex-space-between center">
                                <div className="flex-row center">
                                    <Radio />
                                    <p className="h8 regular dark-title">
                                        {item.title}
                                    </p>
                                </div>
                                <div>
                                    <p className="h8 regular dark-lightest95">
                                        {item.date + " - " + item.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            {/* CALL US */}
            <div className="flex-space-between center">
                <div>
                    <p className="h7 medium dark-title">
                        Have been trouble on your package?
                    </p>
                    <p className="h8 regular dark-lightest95">
                        You can call us. We can help solve your problem
                    </p>
                </div>
                <Button variant="contained" className="primary-background">
                    <Call />
                    <p className="normal h7 medium white">Call Us</p>
                </Button>
            </div>
        </Container>
    );
}

function InsidePackage(orders) {

    const orderDetail = orders.orders;

    console.log(orderDetail);

    const total = orderDetail.orderItems.reduce((total, product) => {
        return total + product.quantity * product.product.price;
    }, 0);
    return (
        <Container>
            <p className="h5 medium dark-title ">Inside package</p>
            <div>
                <Stack className="mg40" spacing={3}>
                    {orderDetail.orderItems.map((item, index) => (
                        <Stack spacing={4} direction={"row"} className="center">
                            <div
                                style={{ width: "50px", height: "50px" }}
                                className="image-container flex-center"
                            >
                                <img
                                    height={50}
                                    src={item.product.image}
                                    alt=""
                                />
                            </div>
                            <div>
                                <p className="h8 medium dark-title">
                                    {item.product.name}
                                </p>
                                <div className="flex-space-between flex-row">
                                    <p className="green h8 regular">
                                        {formattedNumber(item.product.price)}
                                    </p>
                                    <div className="flex-row">
                                        <p className="dark-lighter5a h8 regular">
                                            {item.quantity > 1
                                                ? `${item.quantity} items`
                                                : `${item.quantity} item`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Stack>
                    ))}
                    <Stack spacing={2}>
                        <div className="flex-row flex-space-between">
                            <p className="h7 regular dark-lightest95">
                                Subtotal
                            </p>
                            <p className="h7 regular dark-title">
                                {formattedNumber(total)}
                            </p>
                        </div>
                        <div className="flex-row flex-space-between">
                            <p className="h7 regular dark-lightest95">
                                Shipping
                            </p>
                            <p className="h7 regular dark-title">
                                {formattedNumber(0)}
                            </p>
                        </div>
                        <div className="flex-row flex-space-between">
                            <p className="h7 regular dark-lightest95">
                                Discount 0%
                            </p>
                            <p className="h7 regular red">
                                {formattedNumber(0)}
                            </p>
                        </div>
                        <div className="flex-row flex-space-between">
                            <p className="h7 medium dark-title">Order Total</p>
                            <p className="h7 medium dark-title">
                                {formattedNumber(total)}
                            </p>
                        </div>
                    </Stack>
                </Stack>
            </div>
        </Container>
    );
}

export default OrderTracking;
