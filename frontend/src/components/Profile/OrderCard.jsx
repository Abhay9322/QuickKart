import React from "react";
import { FaEye } from "react-icons/fa";

const OrderCard = ({ order }) => {

    const statusColors = {
        Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
        Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        Shipped: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 shadow-xl hover:border-green-500/30 transition-all">

            <div className="flex flex-col md:flex-row items-center gap-5">

                {/* PRODUCT IMAGE */}
                <img
                    src={order.image}
                    alt={order.name}
                    className="w-24 h-24 object-cover rounded-2xl border border-white/10"
                />

                {/* DETAILS */}
                <div className="flex-1">

                    <h3 className="font-semibold text-white text-lg">
                        {order.name}
                    </h3>

                    <p className="text-gray-400 text-sm">
                        Order ID: {order.id}
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                        Ordered on {order.date}
                    </p>

                    <p className="font-bold mt-2 text-green-400 text-lg">
                        ₹{order.price}
                    </p>

                </div>

                {/* STATUS */}
                <span
                    className={`px-4 py-2 rounded-full text-xs border ${statusColors[order.status]}`}
                >
                    {order.status}
                </span>

                {/* ACTION */}
                <button className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-white hover:bg-white/10 hover:border-green-500/30 transition">
                    <FaEye />
                    Track Order
                </button>

            </div>

        </div>
    );
};

export default OrderCard;