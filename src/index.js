import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId="828618632738-v9slmd06oc8va0huhmu63oslc3ks7cnn.apps.googleusercontent.com">
        <App />,
    </GoogleOAuthProvider>,
);
