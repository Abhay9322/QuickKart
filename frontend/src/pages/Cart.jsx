// src/pages/Cart.jsx

import React from "react";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import axios from "axios";
import { useState, useEffect } from "react";

const Cart = () => {
    // const [cartItems, setCartItems] = useState([
    //     {
    //         id: 1,
    //         name: "Elite Runner",
    //         price: 120,
    //         quantity: 1,
    //         image:
    //             "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
    //     },
    //     {
    //         id: 2,
    //         name: "Urban Hoodie",
    //         price: 80,
    //         quantity: 2,
    //         image:
    //             "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    //     },
    // ]);

    const [cartItems, setCartItems] = useState([])

    const getCartItems = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/cart", { withCredentials: true })
            setCartItems(response.data.items)
            console.log(Array.isArray(response.data.items))
            console.log("Cart response is:", response.data);

        } catch (error) {
            console.log(error.response.data);

        }
    }

    useEffect(() => {
        getCartItems()
    }, [])



    const increaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <div className="relative min-h-screen bg-[#050816] overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-600/20 blur-[150px]" />

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
                        {cartItems.map((item) => (
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