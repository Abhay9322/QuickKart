import React from "react";

const ProfileHeader = ({ user }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col lg:flex-row items-center gap-6 shadow-xl hover:border-green-500/30 transition-all">

            <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-green-500"
            />

            <div className="flex-1 text-center lg:text-left">

                <h1 className="text-2xl sm:text-3xl font-bold text-white break-words">
                    {user.name}
                </h1>

                <p className="text-gray-400 text-sm sm:text-base break-all">
                    {user.email}
                </p>

                <p className="text-green-400 text-sm mt-2">
                    Verified Customer 🌱
                </p>

            </div>

            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-all">
                Edit Profile
            </button>

        </div>
    );
};

export default ProfileHeader;