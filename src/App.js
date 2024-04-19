import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import Register from "./components/register/Register";
import Categories from "./components/categories/Categories";
import Home from "./components/home/Home";
import Ordersuccessful from "./components/ordersuccessful/ordersuccessful";
import WelcomeBack from "./components/signin/WelcomeBack";
import Search from "./components/search/Search";
import Cart from "./components/cart/Cart";
import OrderTracking from "./components/order_tracking/OrderTracking";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { Provider } from "react-redux";
import store from "./redux/store";
import Favorites from "./components/favorite/Favorites";
import User from "./components/user/User";
import PageNotFound from "./components/404PageNotFound";
import Products from "./components/search/Products";
import Slide from "./components/Slide/Slide";
import SignUp from "./components/register/SignUp";
function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route
                        path="/ordersuccessful"
                        element={<Ordersuccessful />}
                    />
                    <Route path="/productdetails" element={<ProductDetail />} />
                    <Route path="/ordertracking" element={<OrderTracking />} />
                    <Route path="/welcomeback" element={<WelcomeBack />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/favorite" element={<Favorites />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/*" element={<PageNotFound />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/slide" element={<Slide />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
