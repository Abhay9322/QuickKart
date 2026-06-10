import React from "react";

const CartItem = ({ item, onIncrease, onDecrease }) => {
    return (
        <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-5 flex justify-between items-center gap-4 shadow-md">

            {/* PRODUCT INFO */}
            <div className="flex items-center gap-4">

                <img
                    src={item.product?.images?.[0] || "/placeholder.png"}
                    alt={item.product?.title}
                    className="w-20 h-20 object-cover rounded-xl border border-white/10"
                />

                <div>
                    <h2 className="font-semibold text-white text-lg">
                        {item.product?.title}
                    </h2>

                    <p className="text-green-400 text-sm">
                        ₹{item.product?.price}
                    </p>
                </div>

            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-3">

                <button
                    onClick={() => onDecrease(item._id)}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-600 transition"
                >
                    -
                </button>

                <span className="text-white font-semibold text-lg">
                    {item.quantity}
                </span>

                <button
                    onClick={() => onIncrease(item._id)}
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-600 transition"
                >
                    +
                </button>

            </div>

            {/* TOTAL */}
            <div className="font-bold text-white text-lg">
                ₹{(item.product?.price || 0) * item.quantity}
            </div>

        </div>
    );
};

export default CartItem;