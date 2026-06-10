// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "../pages/Home";
// import About from "./pages/About";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import AuthPage from "../pages/AuthPage";
import Profile from "../pages/Profile";
import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Dashboard from "../pages/Dashboard";
import OrderSuccess from "../pages/OrderSuccess";
import MyOrders from "../pages/MyOrders";

const AppRoute = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route path="/product" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/order-success/:id" element={<OrderSuccess />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRoute;