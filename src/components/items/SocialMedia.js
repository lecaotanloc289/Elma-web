import React from "react";
import logo from "../../assets/logo";
export default function SocialMedia() {
    return (
        <div className="icon-glyph">
            <a href="https://www.facebook.com/">
                <img src={logo.facebook} alt="" />
            </a>
            <a href="http://" target="_blank" rel="noreferrer">
                <img src={logo.twitter} alt="" />
            </a>
            <a href="http://" rel="noreferrer" target="_blank">
                <img src={logo.youtube} alt="" />
            </a>
            <a href="http://" rel="noreferrer" target="_blank">
                <img src={logo.instagram} alt="" />
            </a>
        </div>
    );
}

export function SocialMediaFooter() {
    return (
        <div className="icon-glyph">
            <a href="http://" rel="noreferrer" target="_blank">
                <img src={logo.google} alt="" />
            </a>
            <a href="https://www.facebook.com/">
                <img src={logo.facebook} alt="" />
            </a>
            <a href="http://" rel="noreferrer" target="_blank">
                <img src={logo.twitter} alt="" />
            </a>
            <a href="http://" rel="noreferrer" target="_blank">
                <img src={logo.Linkedin} alt="" />
            </a>
            <a href="http://" rel="noreferrer" target="_blank">
                <img src={logo.instagram} alt="" />
            </a>
            <a href="http://" rel="noreferrer" target="_blank">
                <img src={logo.Github} alt="" />
            </a>
        </div>
    );
}
