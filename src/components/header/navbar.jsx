import React from "react";
import "./navbar.scss";
import logo from "../../assets/logo";
import icons from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
function SocialMedia() {
    return (
        <div className="icon-glyph">
            <a target="_blank" href="https://www.facebook.com/">
                <img src={logo.facebook} alt="" />
            </a>
            <a href="http://" target="_blank">
                <img src={logo.twitter} alt="" />
            </a>
            <a href="http://" target="_blank">
                <img src={logo.youtube} alt="" />
            </a>
            <a href="http://" target="_blank">
                <img src={logo.instagram} alt="" />
            </a>
        </div>
    );
}

function Tools() {
    const navigate = useNavigate();
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <tr className="tools-support">
            <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/ordertracking")}
            >
                <p className="h7 regular">Order tracking</p>
            </div>
            <a href="#">
                <p className="h7 regular">Help</p>
            </a>

            <div className="flex-row">
                <img className="image-language" src={logo.Vietnam} alt="" />
                <p className="h7 regular black">Vietnam</p>
                {/* <img src={icons.Chevron_down} alt="" /> */}
            </div>
        </tr>
    );
}

export default function Navbar() {
    return (
        <div className="header-1">
            <SocialMedia />
            <Tools />
        </div>
    );
}
