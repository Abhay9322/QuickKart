import React from "react";
import { FaEye } from "react-icons/fa";

const OrderCard = ({ order }) => {

    const statusColors = {
        pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        delivered: "bg-green-500/20 text-green-400 border-green-500/30",
        shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-5 shadow-xl">

            <div className="flex flex-col lg:flex-row gap-5">

                <div className="flex justify-center lg:justify-start">
                    <img
                        src={
                            order.items?.[0]?.image ||
                            "https://via.placeholder.com/100"
                        }
                        alt={order.items?.[0]?.name}
                        className="w-24 h-24 object-cover rounded-2xl border border-white/10"
                    />
                </div>

                <div className="flex-1 text-center lg:text-left">

                    <h3 className="font-semibold text-white text-lg">
                        {order.items?.[0]?.name}
                    </h3>

                    <p className="text-gray-400 text-sm break-all">
                        Order ID: {order.orderId}
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                        Ordered on{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <p className="font-bold mt-2 text-green-400 text-lg">
                        ₹{order.pricingDetails?.grandTotal}
                    </p>

                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3">

                    <span
                        className={`px-4 py-2 rounded-full text-xs border ${statusColors[
                            order.orderStatus?.toLowerCase()
                        ]
                            }`}
                    >
                        {order.orderStatus}
                    </span>

                    <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition">
                        <FaEye />
                        Track Order
                    </button>

                </div>

            </div>
        </div>
    );
};

export default OrderCard;