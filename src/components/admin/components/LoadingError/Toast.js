import React from "react";
// import { ToastContainer } from "react-toastify";

const Toast = () => {
    return (
        <div>
            <Toast
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
            />
            {/* Same as */}
            <Toast />
        </div>
    );
};

export default Toast;
