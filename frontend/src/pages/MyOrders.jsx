import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/orders",
                    {
                        withCredentials: true
                    }
                );

                setOrders(response.data.data);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-[#050816] px-6 py-10">

            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-4xl font-bold text-white">
                    My Orders
                </h1>

                <p className="text-gray-400 mt-2">
                    Track and manage all your orders.
                </p>
            </div>

            {/* Orders List */}
            <div className="max-w-6xl mx-auto space-y-5">

                {orders.length === 0 ? (
                    <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-10 text-center">

                        <h2 className="text-2xl font-semibold text-white">
                            No Orders Found
                        </h2>

                        <p className="text-gray-400 mt-2">
                            You haven't placed any orders yet.
                        </p>

                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-[#0b1020] border border-white/10 rounded-2xl p-6 shadow-lg hover:border-green-500/40 transition"
                        >

                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                                {/* Left Side */}
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {order.orderId}
                                    </h2>

                                    <p className="text-gray-400 mt-1">
                                        Order ID
                                    </p>
                                </div>

                                {/* Amount */}
                                <div>
                                    <p className="text-gray-400">
                                        Total Amount
                                    </p>

                                    <h3 className="text-2xl font-bold text-green-400">
                                        ₹{order?.pricingDetails?.grandTotal}
                                    </h3>
                                </div>

                                {/* Status */}
                                <div>
                                    <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-medium">
                                        {order.orderStatus}
                                    </span>
                                </div>


                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default MyOrders;