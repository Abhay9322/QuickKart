import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/orders",
                    {
                        withCredentials: true,
                    }
                );

                setOrders(response.data.data || []);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">

                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    Orders Management
                </h1>

                <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">

                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead className="bg-slate-100 text-slate-700">
                                <tr>
                                    <th className="p-4 text-left">Order ID</th>
                                    <th className="p-4 text-left">Customer</th>
                                    <th className="p-4 text-left">Products</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.length > 0 ? (
                                    orders.map((o) => (
                                        <tr
                                            key={o._id}
                                            className="border-b hover:bg-slate-50 transition"
                                        >
                                            <td className="p-4 font-medium text-slate-800">
                                                {o.orderId}
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {o.shippingAddress?.fullName}
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {o.items?.map(
                                                    (item) => item.name
                                                ).join(", ")}
                                            </td>

                                            <td className="p-4 font-semibold text-slate-800">
                                                ₹{o.pricingDetails?.grandTotal}
                                            </td>

                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${o.orderStatus === "delivered"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : o.orderStatus === "pending"
                                                                ? "bg-amber-100 text-amber-700"
                                                                : "bg-blue-100 text-blue-700"
                                                        }`}
                                                >
                                                    {o.orderStatus}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition">
                                                        View
                                                    </button>

                                                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition">
                                                        Update
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-10 text-slate-500"
                                        >
                                            No Orders Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Orders;