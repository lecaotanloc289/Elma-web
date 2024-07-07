import React from "react";
import { useSelector } from "react-redux";
import ShippingPayment from "./ShippingPayment";
import { CartCustomerInfo } from "./CartCustomerInfo";
import Review from "./Review";
import { Box, Card, Step, StepButton, Stepper } from "@mui/material";
import { CartBody } from "./CartBody";
export function CartRoute() {
    const userData = useSelector((state) => state.auth.userData);

    // FOR SHIPPING AND PAYMENT METHOD
    const selectedShippingOption = useSelector(
        (state) => state.cart.selectedShippingOption,
    );

    const selectedPaymentMethod = useSelector(
        (state) => state.cart.selectedPaymentMethod,
    );
    const steps = [
        {
            label: "Cart",
            component: <CartBody handleComplete={() => handleComplete()} />,
        },
        {
            label: "Customer Information",
            component: (
                <CartCustomerInfo
                    data={userData}
                    handleBack={() => handleBack()}
                    handleComplete={() => handleComplete()}
                />
            ),
        },
        {
            label: "Shipping ",
            component: (
                <ShippingPayment
                    shipping={selectedShippingOption}
                    payment={selectedPaymentMethod}
                    handleBack={() => handleBack()}
                    handleComplete={() => handleComplete()}
                />
            ),
        },
        

        {
            label: "Review",
            component: (
                <Review
                    handleBack={() => handleBack()}
                    allStepCompleted={() => allStepCompleted()}
                    handleNext={() => handleNext()}
                />
            ),
        },
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };
    return (
        <Box className="cartRoute1">
            <Card
                className="non-box-shadow"
                style={{
                    height: 40,
                    borderRadius: 8,
                }}
            >
                <Stepper
                    className="cartRoute2"
                    style={{ margin: 10 }}
                    nonLinear
                    activeStep={activeStep}
                >
                    {steps.map((step, index) => (
                        <Step
                            className="cartRoute3"
                            completed={completed[index]}
                        >
                            <StepButton
                                className="cartRoute4"
                                // onClick={handleStep(index)}
                            >
                                {step.label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Card>
            <Box>{steps[activeStep].component}</Box>
        </Box>
    );
}
