import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/layout/Sidebar";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/v1/orders",
                {
                    withCredentials: true,
                }
            );

            setOrders(res.data.data || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 p-6">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Orders Management
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Manage customer orders and track delivery status
                    </p>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="p-4 text-left">
                                        Order ID
                                    </th>

                                    <th className="p-4 text-left">
                                        Customer
                                    </th>

                                    <th className="p-4 text-left">
                                        Amount
                                    </th>

                                    <th className="p-4 text-left">
                                        Status
                                    </th>

                                    <th className="p-4 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className="border-b hover:bg-slate-50 transition duration-200"
                                        >
                                            <td className="p-4 font-semibold text-slate-800">
                                                {order.orderId}
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                {order.shippingAddress?.fullName}
                                            </td>

                                            <td className="p-4 font-semibold text-emerald-600">
                                                ₹{order.pricingDetails?.grandTotal}
                                            </td>

                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${order.orderStatus === "delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : order.orderStatus === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : order.orderStatus === "cancelled"
                                                                ? "bg-red-100 text-red-700"
                                                                : order.orderStatus === "processing"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : "bg-purple-100 text-purple-700"
                                                        }`}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex justify-center gap-3">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/orders/view/${order._id}`
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow"
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/orders/update/${order._id}`
                                                            )
                                                        }
                                                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow"
                                                    >
                                                        Update
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-10 text-slate-500 text-lg"
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