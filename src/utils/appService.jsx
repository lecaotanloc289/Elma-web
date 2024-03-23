import axios from "axios";
import { API_PUBLIC_URL } from "./config";
import queryString from "query-string";
import { useState } from "react";

export const toggleFavorite = async (userId, productId) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") return;
    else
        try {
            const res = await axios.put(
                `${API_PUBLIC_URL}users/favorite/${userId}/${productId}`,
            );
            return res.data;
        } catch (err) {
            throw err;
        }
};

export const countProductByCategory = (products, categoryId) => {
    return products.filter((product) => product.category._id === categoryId)
        .length;
};

export const formattedNumber = (price) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);

export const formattedDate = (dateString) => {
    const dateNow = new Date(Date.parse(dateString)).toLocaleString("vi-VN", {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    // const s = dateNow.getSeconds();
    // const m = dateNow.getMinutes();
    // const h = dateNow.getHours();
    // const day = dateNow.getDate();
    // const month = dateNow.getMonth() + 1;
    // const year = dateNow.getFullYear();
    // const formattedDate = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")} - ${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
    return dateNow;
};
export const getIdFromUrl = () => {
    const id = queryString.parse(window.location.search);
    return id.id;
};
