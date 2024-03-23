import { LOGIN_FAILURE, LOGIN_SUCCESS, SIGN_OUT } from "../actions/actionTypes";

const initialState = {
    isAuthenticated: false,
    userData: null,
    userDataDetail: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                error: action.payload,
            };
        case SIGN_OUT:
            return {
                isAuthenticated: false,
                userData: null,
            };

        default:
            return state;
    }
};

export default authReducer;
