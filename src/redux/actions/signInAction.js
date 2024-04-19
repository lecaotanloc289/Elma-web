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

export const signInWithGoogle = (profile) => {
    console.log(profile);
    return async (dispatch) => {
        const apiSignIn = `${API_PUBLIC_URL}google/signin`;
        try {
            const response = await axios.post(apiSignIn, {
                id: profile.id,
                name: profile.name,
                picture: profile.picture,
                email: profile.email,
                family_name: profile.family_name,
                given_name: profile.given_name,
                locate: profile.locate,
                verified_email: profile.verified_email,
            });
            if (response.status === 200) {
                console.log("Login with google successful!");
                dispatch(loginSuccess(response.data));
            } else console.log("Error login with google ", response.status);
        } catch (error) {
            dispatch(loginFailure(error.response));
            console.log("Error login with Google: ", error);
        }
    };
};
