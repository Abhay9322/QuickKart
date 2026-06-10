import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/orders/${id}`,
                    {
                        withCredentials: true
                    }
                );

                setOrder(response.data.data);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-[#0b1020] border border-white/10 rounded-3xl p-8 shadow-2xl">

                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className="text-5xl">✅</span>
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mt-6">
                    <h1 className="text-4xl font-bold text-white">
                        Order Placed Successfully!
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Thank you for your purchase. Your order has been
                        received and is being processed.
                    </p>
                </div>

                {/* Order Details */}
                <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">

                    <div className="flex justify-between">
                        <span className="text-gray-400">
                            Order ID
                        </span>

                        <span className="text-white font-semibold">
                            {order.orderId}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">
                            Total Amount
                        </span>

                        <span className="text-green-400 font-bold text-lg">
                            ₹{order?.pricingDetails?.grandTotal}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-400">
                            Order Status
                        </span>

                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                            {order.orderStatus}
                        </span>
                    </div>

                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <button
                        onClick={() => navigate("/")}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition"
                    >
                        Continue Shopping
                    </button>

                    <button
                        onClick={() => navigate("/my-orders")}
                        className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-semibold transition"
                    >
                        View My Orders
                    </button>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;