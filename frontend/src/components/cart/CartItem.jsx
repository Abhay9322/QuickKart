import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-5 shadow-md">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                {/* Product Info */}
                <div className="flex items-center gap-4">

                    <img
                        src={item.product?.images?.[0] || "/placeholder.png"}
                        alt={item.product?.title}
                        className="w-20 h-20 object-cover rounded-xl border border-white/10"
                    />

                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            {item.product?.title}
                        </h2>

                        <p className="text-sm text-green-400">
                            ₹{item.product?.price}
                        </p>
                    </div>

                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center gap-3">

                    <button
                        onClick={() => onDecrease(item._id)}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-600 transition cursor-pointer"
                    >
                        -
                    </button>

                    <span className="min-w-[30px] text-center text-lg font-semibold text-white">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => onIncrease(item._id)}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-green-600 transition cursor-pointer"
                    >
                        +
                    </button>

                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-start md:items-end gap-3">

                    <div className="text-lg font-bold text-white">
                        ₹{(item.product?.price || 0) * item.quantity}
                    </div>

                    <button
                        onClick={() => onRemove(item?._id)}
                        className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition duration-300 cursor-pointer"
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>
    );
};

export default CartItem;