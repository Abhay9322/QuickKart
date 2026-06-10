import React from "react";

const AddressCard = ({ address }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-white mb-5">
                Delivery Address 🚚
            </h2>

            {/* ADDRESS INFO */}
            <div className="space-y-2 text-gray-300">

                <p className="text-white font-semibold">
                    {address.name}
                </p>

                <p>{address.phone}</p>

                <p>
                    {address.street}, {address.city}
                </p>

                <p>
                    {address.state} - {address.pincode}
                </p>

            </div>

            {/* NOTE */}
            <p className="text-green-400 text-sm mt-4">
                We deliver fresh farm products to this address 🌱
            </p>

            {/* BUTTON */}
            <button className="mt-6 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition">
                Edit Address
            </button>

        </div>
    );
};

export default AddressCard;