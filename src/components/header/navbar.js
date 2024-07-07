import React from "react";
import "./navbar.scss";
import logo from "../../assets/logo";
import { useNavigate } from "react-router-dom";
function SocialMedia() {
    return (
        <div className="icon-glyph">
            <a
                target="_blank"
                href="https://www.facebook.com/"
                rel="noreferrer"
            >
                <img src={logo.facebook} alt="" />
            </a>
            <a href="http://" target="_blank" rel="noreferrer">
                <img src={logo.twitter} alt="" />
            </a>
            <a href="http://" target="_blank" rel="noreferrer">
                <img src={logo.youtube} alt="" />
            </a>
            <a href="http://" target="_blank" rel="noreferrer">
                <img src={logo.instagram} alt="" />
            </a>
        </div>
    );
}
function Tools() {
    const navigate = useNavigate();
    return (
        <tr className="tools-support">
            <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/ordertracking")}
            >
                <p className="h7 regular">Order tracking</p>
            </div>
            <div
                onClick={() => navigate("/chat")}
                style={{ cursor: "pointer" }}
            >
                <p className="h7 regular">Help</p>
            </div>

            <div className="flex-row">
                <img className="image-language" src={logo.Vietnam} alt="" />
                <p className="h7 regular black">Vietnam</p>
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
