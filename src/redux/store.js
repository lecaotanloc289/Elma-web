import { combineReducers, applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import {
    dataReducer,
    favoriteReducer,
    searchReducer,
} from "./reducers/reducers";
import {
    cartReducer,
    notesReducer,
    shippingPaymentReducer,
} from "./reducers/cartReducer";
import { loadState, saveState } from "./storeState";

const loadElmaState = loadState();
const rootReducer = combineReducers({
    favorite: favoriteReducer,
    data: dataReducer,
    auth: authReducer,
    search: searchReducer,
    cart: cartReducer,
    notes: notesReducer,
    shippingPayment: shippingPaymentReducer,
    // add more readucer
});
const store = createStore(rootReducer, loadElmaState, applyMiddleware(thunk));

store.subscribe(() => {
    // save state at localStorage
    saveState(store.getState());
});

window.addEventListener("beforeunload", () => {
    saveState(store.getState());
});

export default store;
