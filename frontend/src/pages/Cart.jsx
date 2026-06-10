// src/pages/Cart.jsx

import React from "react";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {

    const { cartItems, total, increaseQty, decreaseQty } = useContext(CartContext)

    console.log("Cart Items:", cartItems)
    return (
        <div className="relative min-h-screen bg-[#050816] overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-600/20 blur-[150px]" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white">
                        Shopping Cart
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Review your items before checkout.
                    </p>
                </div>

                {/* Cart Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-5">
                        {cartItems?.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onIncrease={increaseQty}
                                onDecrease={decreaseQty}
                            />
                        ))}
                    </div>

                    {/* Order Summary */}
                    <CartSummary total={total} />

                </div>

            </div>
        </div>
    );
};

export default Cart;