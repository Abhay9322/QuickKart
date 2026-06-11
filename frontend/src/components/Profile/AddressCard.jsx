import React from "react";

const AddressCard = ({ address }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl">

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-5">
                Delivery Address 🚚
            </h2>

            <div className="space-y-2 text-gray-300 text-sm sm:text-base">

                <p className="text-white font-semibold">
                    {address.fullName}
                </p>

                <p>{address.phone}</p>

                <p className="break-words">
                    {address.addressLine1}, {address.city}
                </p>

                <p>
                    {address.state} - {address.postalCode}
                </p>

            </div>

            <p className="text-green-400 text-sm mt-4">
                We deliver fresh farm products to this address 🌱
            </p>

            <button className="mt-6 w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition">
                Edit Address
            </button>

        </div>
    );
};

export default AddressCard;