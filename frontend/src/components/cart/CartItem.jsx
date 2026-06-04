import React from "react";

const CartItem = ({ item, onIncrease, onDecrease }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 flex justify-between items-center gap-4 shadow-xl">

            {/* Product Info */}
            <div className="flex items-center gap-4">

                <img
                    src={item.product.images?.[0] || "/placeholder.png"}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-2xl border border-white/10"
                />

                <div>
                    <h2 className="font-semibold text-white text-lg">
                        {item.product.title}
                    </h2>

                    <p className="text-violet-300 text-sm">
                        ${item.product.price}
                    </p>
                </div>

            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">

                <button
                    onClick={() => onDecrease(item.id)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white hover:bg-violet-500 transition"
                >
                    -
                </button>

                <span className="text-white font-semibold text-lg">
                    {item.quantity}
                </span>

                <button
                    onClick={() => onIncrease(item._id)}
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white hover:bg-violet-500 transition"
                >
                    +
                </button>

            </div>

            {/* Total */}
            <div className="font-bold text-xl text-white">
                ${item.product.price * item.quantity}
            </div>

        </div>
    );
};

export default CartItem;