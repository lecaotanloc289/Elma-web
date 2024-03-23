import {
    ADD_TO_CART,
    DECREASE_QUANTITY_SUCCESS,
    FETCH_DATA_FROM_CART,
    INCREASE_QUANTITY_SUCCESS,
    REMOVE_FROM_CART,
    SET_CUSTOMER_ADDRESS,
    SET_PAYMENT_METHOD,
    SET_SHIPPING_OPTION,
    UPDATE_NOTE,
} from "../actions/actionTypes";

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_DATA_FROM_CART:
            return action.payload;

        case ADD_TO_CART:
            return [...state, action.payload];

        case REMOVE_FROM_CART:
            return state.filter((item) => item.id !== action.payload.id);

        case INCREASE_QUANTITY_SUCCESS:
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            );

        case DECREASE_QUANTITY_SUCCESS:
            return state.map((item) =>
                item.id === action.payload && item.quantity > 0
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
            );

        default:
            return state;
    }
};
const initialState = {
    note: "",
    address: null,
};
const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NOTE:
            return {
                ...state,
                note: action.payload,
            };
        case SET_CUSTOMER_ADDRESS:
            return {
                ...state,
                address: action.payload,
            };
        default:
            return state;
    }
};

const initialStateShippingAndPayment = {
    selectedShippingOption: null,
    selectedPaymentMethod: null,
};

const shippingPaymentReducer = (
    state = initialStateShippingAndPayment,
    action,
) => {
    switch (action.type) {
        case SET_SHIPPING_OPTION:
            return {
                ...state,
                selectedShippingOption: action.payload,
            };
        case SET_PAYMENT_METHOD:
            return {
                ...state,
                selectedPaymentMethod: action.payload,
            };

        default:
            return state;
    }
};

export { cartReducer, notesReducer, shippingPaymentReducer };
