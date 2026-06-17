import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/v1/orders/${id}`,
                {
                    withCredentials: true,
                }
            );

            setOrder(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!order) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-semibold text-slate-600">
                    Loading Order...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="max-w-5xl mx-auto">

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-2xl shadow-lg mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Order Details
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Complete order information
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <h3 className="font-bold text-slate-800 mb-2">
                                Order Information
                            </h3>

                            <p className="mb-2">
                                <span className="font-semibold">
                                    Order ID:
                                </span>{" "}
                                {order.orderId}
                            </p>

                            <p className="mb-2">
                                <span className="font-semibold">
                                    Customer:
                                </span>{" "}
                                {order.shippingAddress?.fullName}
                            </p>

                            <p className="mb-2">
                                <span className="font-semibold">
                                    Email:
                                </span>{" "}
                                {order.user?.email}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-800 mb-2">
                                Payment Information
                            </h3>

                            <p className="mb-2">
                                <span className="font-semibold">
                                    Total Amount:
                                </span>{" "}
                                ₹{order.pricingDetails?.grandTotal}
                            </p>

                            <p className="mb-2">
                                <span className="font-semibold">
                                    Status:
                                </span>

                                <span
                                    className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus === "delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.orderStatus === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                >
                                    {order.orderStatus}
                                </span>
                            </p>
                        </div>

                    </div>

                    <hr className="my-6" />

                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        Ordered Products
                    </h2>

                    <div className="space-y-4">
                        {order.items?.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-xl p-4 hover:shadow-md transition"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="font-semibold text-slate-800">
                                            {item.name}
                                        </h3>

                                        <p className="text-slate-600">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <div className="font-bold text-emerald-600">
                                        ₹{item.price}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate("/admin/orders")}
                        className="mt-6 bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-lg"
                    >
                        Back To Orders
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ViewOrder;