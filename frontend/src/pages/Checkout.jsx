// src/pages/Checkout.jsx

import React, { useState } from "react";

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState("card");

    const cartItems = [
        {
            id: 1,
            name: "Premium Running Shoes",
            price: 120,
            quantity: 1,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        },
        {
            id: 2,
            name: "Classic Hoodie",
            price: 80,
            quantity: 1,
            image:
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
        },
    ];

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shipping = 10;
    const total = subtotal + shipping;

    return (
        <div className="relative min-h-screen bg-[#050816] overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Violet Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[180px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Checkout
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Complete your order securely
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Shipping Address */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">

                            <h2 className="text-2xl font-bold text-white mb-6">
                                Shipping Address
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">

                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full md:col-span-2 bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    className="w-full md:col-span-2 bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                                <input
                                    type="text"
                                    placeholder="City"
                                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                                <input
                                    type="text"
                                    placeholder="State"
                                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                                <input
                                    type="text"
                                    placeholder="Country"
                                    className="w-full bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                />

                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">

                            <h2 className="text-2xl font-bold text-white mb-6">
                                Payment Method
                            </h2>

                            <div className="space-y-4">

                                <label className="flex items-center gap-3 border border-white/10 bg-white/5 p-4 rounded-2xl cursor-pointer text-white hover:border-violet-500 transition">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "card"}
                                        onChange={() => setPaymentMethod("card")}
                                    />
                                    Credit / Debit Card
                                </label>

                                <label className="flex items-center gap-3 border border-white/10 bg-white/5 p-4 rounded-2xl cursor-pointer text-white hover:border-violet-500 transition">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "upi"}
                                        onChange={() => setPaymentMethod("upi")}
                                    />
                                    UPI Payment
                                </label>

                                <label className="flex items-center gap-3 border border-white/10 bg-white/5 p-4 rounded-2xl cursor-pointer text-white hover:border-violet-500 transition">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "cod"}
                                        onChange={() => setPaymentMethod("cod")}
                                    />
                                    Cash on Delivery
                                </label>

                            </div>

                            {paymentMethod === "card" && (
                                <div className="grid md:grid-cols-2 gap-4 mt-6">

                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        className="md:col-span-2 bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Expiry Date"
                                        className="bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                    />

                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="bg-transparent border border-white/10 rounded-xl p-3 text-white placeholder-gray-400 outline-none focus:border-violet-500"
                                    />

                                </div>
                            )}

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div>

                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl sticky top-6">

                            <h2 className="text-2xl font-bold text-white mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-5">

                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-xl object-cover border border-white/10"
                                        />

                                        <div className="flex-1">
                                            <h3 className="text-white font-medium">
                                                {item.name}
                                            </h3>

                                            <p className="text-gray-400 text-sm">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-white">
                                            ${item.price}
                                        </p>
                                    </div>
                                ))}

                            </div>

                            <div className="border-t border-white/10 mt-6 pt-5 space-y-3">

                                <div className="flex justify-between text-gray-300">
                                    <span>Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>

                                <div className="flex justify-between text-gray-300">
                                    <span>Shipping</span>
                                    <span>${shipping}</span>
                                </div>

                                <div className="flex justify-between text-white text-xl font-bold">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>

                            </div>

                            <button className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-[1.02] transition">
                                Place Order
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Checkout;