import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import Profile from "./components/User/Profile";
import Store from "./Store";
import { loadUser } from "./actions/userActions";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import Payment from "./components/Cart/Payment";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import OrderList from "./components/Admin/OrderList.js";
import UsersList from "./components/Admin/UsersList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import ProductReviews from "./components/Admin/ProductReviews.js";
import Contact from "./components/layout/Contact/Contact.js";
import About from "./components/layout/About/About.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />
        {isAuthenticated
          ? [
              <Route exact path="/login/shipping" element={<Shipping />} />,
              <Route exact path="/order/confirm" element={<ConfirmOrder />} />,
              <Route
                exact
                path="/process/payment"
                element={
                  <Elements stripe={stripeApiKey && loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />,
              <Route exact path="/success" element={<OrderSuccess />} />,
              <Route exact path="/orders" element={<MyOrders />} />,
              <Route exact path="/order/:id" element={<OrderDetails />} />,
              <Route exact path="/admin/dashboard" element={<Dashboard />} />,
              <Route exact path="/admin/orders" element={<OrderList />} />,
              <Route exact path="/admin/reviews" element={<ProductReviews />} />,
              <Route exact path="/admin/users" element={<UsersList />} />,
              <Route exact path="/admin/products" element={<ProductList />} />,
              <Route exact path="/admin/product" element={<NewProduct />} />,
              <Route exact path="/admin/product/:id" element={<UpdateProduct />} />,
              <Route exact path="/admin/user/:id" element={<UpdateUser />} />,
              <Route exact path="/admin/order/:id" element={<ProcessOrder />} />,
              <Route exact path="/me/update" element={<UpdateProfile />} />,
              <Route exact path="/profile" element={<Profile />} />,
              <Route
                exact
                path="/password/update"
                element={<UpdatePassword />}
              />,
            ]
          : null}
        <Route path={"*"} element={<Navigate replace to={"/login"} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
