import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/cart/CartItem";
import { toast } from "sonner";

const Checkout = () => {
    const navigate = useNavigate();

    const { cartItems, setCartItems } = useContext(CartContext);

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India"
    });

    console.log("Cart items are", cartItems);


    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const shipping = 0;
    const total = subtotal + shipping;

    console.log("Total is", total);


    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/orders",
                {
                    shippingAddress,
                    paymentMethod
                },
                {
                    withCredentials: true
                }
            );

            console.log(response.data);

            setCartItems([])
            // alert("Order Placed Successfully ✅");
            toast.success("Order Placed Successfully ✅");

            navigate(`/order-success/${response.data.data._id}`);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

            {/* Glow Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[150px]" />

            {/* MAIN WRAPPER */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col justify-center">

                {/* Heading */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold">Checkout</h1>
                    <p className="text-gray-400 mt-2">
                        Complete your purchase securely
                    </p>
                </div>

                {/* GRID */}
                <div className="grid lg:grid-cols-3 gap-8 items-stretch">

                    {/* LEFT */}
                    <div className="lg:col-span-2 bg-[#0b1020] border border-white/10 rounded-3xl p-8 shadow-xl">

                        <h2 className="text-2xl font-bold mb-6">
                            Shipping Address
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">

                            {/* inputs */}
                            {["fullName", "phone", "addressLine1", "addressLine2", "city", "state", "postalCode", "country"].map((field) => (
                                <input
                                    key={field}
                                    type="text"
                                    placeholder={field}
                                    value={shippingAddress[field]}
                                    onChange={(e) =>
                                        setShippingAddress({
                                            ...shippingAddress,
                                            [field]: e.target.value,
                                        })
                                    }
                                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                                />
                            ))}

                        </div>

                        {/* PAYMENT */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">
                                Payment Method
                            </h3>

                            <div className="grid grid-cols-3 gap-3">
                                {["COD", "Stripe", "Razorpay"].map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => setPaymentMethod(m)}
                                        className={`p-4 rounded-xl border transition ${paymentMethod === m
                                            ? "border-green-500 bg-green-500/10"
                                            : "border-white/10"
                                            }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="bg-[#0b1020] border border-white/10 rounded-3xl p-8 shadow-xl h-full flex flex-col lg:sticky lg:top-6">

                        <h2 className="text-2xl font-bold mb-6">
                            Order Summary
                        </h2>

                        <div className="flex-1 space-y-4 overflow-y-auto max-h-[60vh] pr-2">

                            {cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                                >
                                    <img
                                        src={item.product.images?.[0]?.url}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {item.product.title}
                                        </h3>
                                        <p className="text-gray-400">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <div className="text-green-400 font-bold">
                                        ₹{item.product.price}
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* TOTAL */}
                        <div className="mt-6 border-t border-white/10 pt-6 space-y-3">

                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>

                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-green-400">Free</span>
                            </div>

                            <div className="flex justify-between text-2xl font-bold">
                                <span>Total</span>
                                <span className="text-green-400">₹{total}</span>
                            </div>

                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="w-full mt-8 bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-green-600/30"
                        >
                            Place Order 🚀
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;