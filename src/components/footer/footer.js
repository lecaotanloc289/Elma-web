import React from "react";
import Container from "@mui/material/Container";
import "./footer.scss";
import { Link, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { SocialMediaFooter } from "../items/SocialMedia";
import Elma from "../items/Elma";
import { useNavigate } from "react-router-dom";
export function Copyright() {
    const navigate = useNavigate();

    return (
        <Typography variant="subtitle1" className="copyright">
            <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                Elma © Copyright 2024, Inc. All rights reserved
            </div>{" "}
        </Typography>
    );
}

export function Footer1() {
    return (
        <Stack direction={"row"} spacing={40}>
            <Elma />
            <Stack className="footer-menu" direction={"row"} spacing={10}>
                <Stack>
                    <p className="h7 regular">First Menu</p>
                    <Link className="h8 regular">Feature</Link>
                    <Link className="h8 regular">Enterpise</Link>
                    <Link className="h8 regular">Securiry</Link>
                    <Link className="h8 regular">Customer Stories</Link>
                    <Link className="h8 regular">Pricing</Link>
                    <Link className="h8 regular">Demo</Link>
                </Stack>
                <Stack>
                    <p className="h7 regular">Second Menu</p>
                    <Link className="h8 regular">Engineering</Link>
                    <Link className="h8 regular">Financial Services</Link>
                    <Link className="h8 regular">Sales</Link>
                    <Link className="h8 regular">IT</Link>
                    <Link className="h8 regular">Customer Support</Link>
                    <Link className="h8 regular">Human Resources</Link>
                    <Link className="h8 regular">Media</Link>
                </Stack>
                <Stack>
                    <p className="h7 regular">Third Menu</p>
                    <Link className="h8 regular">Tips</Link>
                    <Link className="h8 regular">Blog</Link>
                    <Link className="h8 regular">Event</Link>
                    <Link className="h8 regular">Certified Program</Link>
                    <Link className="h8 regular">Help Center</Link>
                    <Link className="h8 regular">API</Link>
                    <Link className="h8 regular">Download Template</Link>
                </Stack>
                <Stack>
                    <p className="h7 regular">Fourth Menu</p>
                    <Link className="h8 regular" underline="hover">
                        About Us
                    </Link>
                    <Link className="h8 regular" underline="hover">
                        Leadership
                    </Link>
                    <Link className="h8 regular" underline="hover">
                        News
                    </Link>
                    <Link className="h8 regular" underline="hover">
                        Media Kit
                    </Link>
                    <Link className="h8 regular" underline="hover">
                        Career
                    </Link>
                    <Link className="h8 regular" underline="hover">
                        Documentation
                    </Link>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default function Footer() {
    return (
        <div>
            <div className="footer-top">
                <Container className="footer" maxWidth="lg">
                    <Container className="footer-1 ">
                        <Footer1 />
                    </Container>
                </Container>
            </div>
            <div className="footer-bottom">
                <Container className="footer" maxWidth="lg">
                    <Container className="footer-2">
                        <Copyright />
                        <SocialMediaFooter />
                    </Container>
                </Container>
            </div>
        </div>
    );
}
