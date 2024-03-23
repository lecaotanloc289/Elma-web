import React from "react";
import logo from "../../assets/logo";
import { useNavigate } from "react-router-dom";

export default function Elma() {
    const navigate = useNavigate();
    return (
        <a
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            className="elma-logo"
        >
            <img src={logo.Elma} alt="" />
        </a>
    );
}
