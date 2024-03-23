import axios from "axios";
import { API_PUBLIC_URL } from "../../utils/config";
import { LOGIN_FAILURE, LOGIN_SUCCESS, SIGN_OUT } from "./actionTypes";
export const signOut = () => ({
    type: SIGN_OUT,
});
// Hành động đăng nhập thành công
export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
});

// Hành động đăng nhập thất bại
export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

// Hành động đăng nhập và tải thông tin người dùng
export const signInAndLoadUserData = (data) => {
    return async (dispatch) => {
        const apiSignIn = `${API_PUBLIC_URL}users/signin`;
        try {
            const res = await axios.post(apiSignIn, {
                email: data.email,
                password_hash: data.password_hash,
            });

            dispatch(loginSuccess(res.data));
        } catch (error) {
            dispatch(loginFailure(error.response));
            console.log("Error response from server:", error.data);
        }
    };
};
