import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/layout/Sidebar";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                "http://localhost:5000/api/v1/orders",
                {
                    withCredentials: true,
                }
            );

            setOrders(res.data.data || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = useMemo(() => {
        return orders.filter((order) =>
            order.orderId
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [orders, search]);

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (o) => o.orderStatus === "pending"
    ).length;

    const processingOrders = orders.filter(
        (o) => o.orderStatus === "processing"
    ).length;

    const deliveredOrders = orders.filter(
        (o) => o.orderStatus === "delivered"
    ).length;

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 p-4 md:p-6 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Orders Management
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Manage customer orders and delivery status
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Total Orders
                        </h3>

                        <p className="text-3xl font-bold text-indigo-600 mt-2">
                            {totalOrders}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Pending
                        </h3>

                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {pendingOrders}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Processing
                        </h3>

                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {processingOrders}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Delivered
                        </h3>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {deliveredOrders}
                        </p>
                    </div>

                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search Order ID..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-4
                            py-3
                            focus:ring-2
                            focus:ring-indigo-500
                            outline-none
                        "
                    />

                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

                    {loading ? (
                        <div className="text-center py-12 text-slate-500">
                            Loading Orders...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead className="bg-indigo-600 text-white">

                                    <tr>
                                        <th className="px-4 py-4 text-left">
                                            Order ID
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Customer
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Amount
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Status
                                        </th>

                                        <th className="px-4 py-4 text-center">
                                            Actions
                                        </th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order) => (
                                            <tr
                                                key={order._id}
                                                className="
                                                    border-b
                                                    hover:bg-slate-50
                                                    transition
                                                "
                                            >
                                                <td className="px-4 py-4 font-semibold">
                                                    {order.orderId}
                                                </td>

                                                <td className="px-4 py-4">
                                                    {
                                                        order
                                                            .shippingAddress
                                                            ?.fullName
                                                    }
                                                </td>

                                                <td className="px-4 py-4 font-semibold text-green-600">
                                                    ₹
                                                    {
                                                        order
                                                            .pricingDetails
                                                            ?.grandTotal
                                                    }
                                                </td>

                                                <td className="px-4 py-4">

                                                    <span
                                                        className={`
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            text-sm
                                                            font-semibold

                                                            ${order.orderStatus ===
                                                                "delivered"
                                                                ? "bg-green-100 text-green-700"
                                                                : order.orderStatus ===
                                                                    "pending"
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : order.orderStatus ===
                                                                        "processing"
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : order.orderStatus ===
                                                                            "cancelled"
                                                                            ? "bg-red-100 text-red-700"
                                                                            : "bg-purple-100 text-purple-700"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            order.orderStatus
                                                        }
                                                    </span>

                                                </td>

                                                <td className="px-4 py-4">

                                                    <div className="flex flex-col md:flex-row gap-2 justify-center">

                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/orders/view/${order._id}`
                                                                )
                                                            }
                                                            className="
                                                                bg-blue-600
                                                                hover:bg-blue-700
                                                                text-white
                                                                px-4
                                                                py-2
                                                                rounded-lg
                                                            "
                                                        >
                                                            View
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/orders/update/${order._id}`
                                                                )
                                                            }
                                                            className="
                                                                bg-emerald-600
                                                                hover:bg-emerald-700
                                                                text-white
                                                                px-4
                                                                py-2
                                                                rounded-lg
                                                            "
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
                                                className="
                                                    text-center
                                                    py-12
                                                    text-slate-500
                                                "
                                            >
                                                No Orders Found
                                            </td>
                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Orders;