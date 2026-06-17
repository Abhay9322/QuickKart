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
import Product from "../pages/Admin/Products"
// import Orders from "../pages/Admin/Orders";
import Farmers from "../pages/Admin/Farmers";
import Customers from "../pages/Admin/Customers";
import AdminLayout from "../components/layout/AdminLayout";
import CreateProduct from "../components/dashboard/CreateProduct";

import ViewOrder from "../pages/Admin/orders/ViewOrder";
import Orders from "../pages/Admin/orders/Orders";
import UpdateOrder from "../pages/Admin/orders/UpdateOrder";

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
                    <Route path="/admin/products" element={<Product />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/farmers" element={<Farmers />} />
                    <Route path="/admin/createProduct" element={<CreateProduct />} />
                    <Route path="/admin/customers" element={<Customers />} />
                    <Route path="/order-success/:id" element={<OrderSuccess />} />

                    <Route
                        path="/admin/orders"
                        element={<Orders />}
                    />

                    <Route
                        path="/admin/orders/view/:id"
                        element={<ViewOrder />}
                    />

                    <Route
                        path="/admin/orders/update/:id"
                        element={<UpdateOrder />}
                    />

                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRoute;
