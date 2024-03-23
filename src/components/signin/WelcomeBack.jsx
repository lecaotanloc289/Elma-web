import {
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import icons from "../../assets/icons";
import "./WelcomeBack.scss";
import { LeadingBrand } from "../register/Register";
import MainLayout from "../MainLayout";

const benefits = [
  {
    icon: icons.Shipping,
    title: "Free Shipping",
    subtitle: "You will get free shipping from all your transactions",
  },
  {
    icon: icons.Money,
    title: "Money guarantee",
    subtitle: "You will get free shipping from all your transactions",
  },
  {
    icon: icons.CustomerService,
    title: "Customer Support",
    subtitle: "You will get free shipping from all your transactions",
  },
  {
    icon: icons.BestPrices,
    title: "Best Prices",
    subtitle: "You will get free shipping from all your transactions",
  },
];

export default function WelcomeBack() {
  return (
    <MainLayout>
      <Container className="welcome-back flex-row space-around" maxWidth={"lg"}>
        <Benefits />
        <Signin />
      </Container>
      <div className="brand">
      <LeadingBrand/>
      </div>
      
      
    </MainLayout>
  );
}

export function Benefits() {
  return (
    <Container className="benefits" maxWidth="sm">
      <p className="h2 medium32">
        Enjoy all big benefits from Elma that you can’t find in other product
        again
      </p>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {benefits.map((item, index) => (
          <Grid key={index} xs={6} >
            <Card className="benefits-item border-1-solid non-box-shadow">
              <Stack spacing={1.5}>
                <img width={28} src={item.icon} alt="" />
                <p className="black-title h6 regular">{item.title}</p>
                <p className="h8 regular dark-lightest95">{item.subtitle}</p>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export function Signin() {
  return (
    <Stack width={540} spacing={3}>
      <Stack spacing={1}>
        <p className="h3 medium">Welcome back</p>
        <p className="h81 regular dark-lighter5a">
          Welcome our lovely user. You miss transaction on Elma. Don’t worry,
          you just need insert your username and email to start shopping again.
        </p>
      </Stack>
      <Stack spacing={3}>
        <p className="h7 regular">Username or Email</p>
        <TextField className="input"></TextField>
        <tr className="flex-space-between">
          <td>
            <p className="h7 regular">Password</p>
          </td>
          <td>
            <a href="" className="link-nomal-cusor indigo">
              <p className="h7 regular">Forgot password</p>
            </a>
          </td>
        </tr>
        <TextField className="input " type="password"></TextField>
        <div>
          <FormControlLabel
            className="check-box"
            control={<Checkbox defaultChecked size="large" />}
            label="Stay signed for a week"
          />
        </div>
        <tr className="flex-space-between">
          <Button
            fullWidth
            variant="contained"
            className="button-contained primary-background"
          >
            <p className="normal h7 regular">Login now</p>
          </Button>
          <span className="or h81 regular dark-lightest95">or</span>
          <Button variant="outlined" className="button-outlined register-btn">
            <p className="normal h7 regular">Register</p>
          </Button>
        </tr>
      </Stack>
    </Stack>
  );
}
