import React from "react";
import { FaEye } from "react-icons/fa";

const OrderCard = ({ order }) => {

    const statusColors = {
        Delivered: "bg-green-500/20 text-green-400",
        Pending: "bg-yellow-500/20 text-yellow-400",
        Shipped: "bg-blue-500/20 text-blue-400",
        Cancelled: "bg-red-500/20 text-red-400",
    };

    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 shadow-xl">

            <div className="flex flex-col md:flex-row items-center gap-4">

                <img
                    src={order.image}
                    alt={order.name}
                    className="w-24 h-24 object-cover rounded-2xl border border-white/10"
                />

                <div className="flex-1">
                    <h3 className="font-semibold text-white">
                        {order.name}
                    </h3>

                    <p className="text-gray-400">
                        {order.id}
                    </p>

                    <p className="text-gray-500 text-sm">
                        {order.date}
                    </p>

                    <p className="font-bold mt-2 text-white">
                        ${order.price}
                    </p>
                </div>

                <span
                    className={`px-4 py-2 rounded-full text-sm ${statusColors[order.status]}`}
                >
                    {order.status}
                </span>

                <button className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white hover:bg-white/10 transition">
                    <FaEye />
                    Details
                </button>

            </div>

        </div>
    );
};

export default OrderCard;