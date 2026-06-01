import React from "react";

const AddressCard = ({ address }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl">

            <h2 className="text-2xl font-bold text-white mb-5">
                Shipping Address
            </h2>

            <div className="space-y-2 text-gray-300">
                <p>{address.name}</p>
                <p>{address.phone}</p>
                <p>{address.street}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.pincode}</p>
            </div>

            <button className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition">
                Edit Address
            </button>

        </div>
    );
};

export default AddressCard;