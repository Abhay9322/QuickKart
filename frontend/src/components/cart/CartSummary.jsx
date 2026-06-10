import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartSummary = ({ total }) => {

    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/orders",
                {},
                { withCredentials: true }
            );

            console.log(response.data);

            alert("Order Created Successfully ✅");

            navigate("/checkout");

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-6 shadow-md sticky top-6">

            <h2 className="text-xl font-semibold text-white mb-6">
                Order Summary
            </h2>

            <div className="space-y-4 text-gray-300">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

            </div>

            <button
                onClick={() => navigate("/checkout")}
                // onClick={handleCheckout}
                className="w-full mt-6 bg-green-600 hover:bg-green-500 transition py-3 rounded-xl font-semibold"
            >
                Proceed to Checkout
            </button>

        </div>
    );
};

export default CartSummary;