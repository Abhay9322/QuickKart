import React from "react";

const ProfileHeader = ({ user }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-5 shadow-xl hover:border-green-500/30 transition-all">

            {/* USER IMAGE */}
            <img
                src={user.image}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-green-500"
            />

            {/* USER INFO */}
            <div className="flex-1 text-center md:text-left">

                <h1 className="text-3xl font-bold text-white">
                    {user.name}
                </h1>

                <p className="text-gray-400">
                    {user.email}
                </p>

                <p className="text-green-400 text-sm mt-1">
                    Verified Farmer / Customer 🌱
                </p>

            </div>

            {/* BUTTON */}
            <button className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500  text-white font-semibold transition-all">
                Edit Profile
            </button>

        </div>
    );
};

export default ProfileHeader;