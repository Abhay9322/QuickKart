import React from "react";

const CartSummary = ({ total }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl sticky top-6">

            <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${total}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-400">
                        Free
                    </span>
                </div>

                <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold text-white">
                    <span>Total</span>
                    <span>${total}</span>
                </div>

            </div>

            <button className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-[1.02] transition">
                Proceed to Checkout
            </button>

        </div>
    );
};

export default CartSummary;