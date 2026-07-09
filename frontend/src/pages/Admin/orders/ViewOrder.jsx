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
                Loading Order...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-6">

            <div className="max-w-6xl mx-auto">

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-lg mb-6">

                    <h1 className="text-3xl font-bold text-white">
                        Order Details
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Complete information about the order
                    </p>

                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <h2 className="font-bold text-lg mb-3">
                                Customer Information
                            </h2>

                            <p>
                                <strong>Name:</strong>{" "}
                                {order.shippingAddress?.fullName}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {order.user?.email}
                            </p>

                            <p>
                                <strong>Order ID:</strong>{" "}
                                {order.orderId}
                            </p>

                        </div>

                        <div>

                            <h2 className="font-bold text-lg mb-3">
                                Payment Information
                            </h2>

                            <p>
                                <strong>Total:</strong> ₹
                                {order.pricingDetails?.grandTotal}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}

                                <span className="ml-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                    {order.orderStatus}
                                </span>

                            </p>

                        </div>

                    </div>

                    <hr className="my-6" />

                    <h2 className="text-xl font-bold mb-4">
                        Ordered Products
                    </h2>

                    <div className="space-y-4">

                        {order.items?.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-xl p-4"
                            >
                                <div className="flex justify-between">

                                    <div>
                                        <h3 className="font-semibold">
                                            {item.name}
                                        </h3>

                                        <p>
                                            Qty : {item.quantity}
                                        </p>
                                    </div>

                                    <div className="font-bold text-green-600">
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