import React from "react";

const ProfileHeader = ({ user }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-5 shadow-xl">

            <img
                src={user.image}
                alt={user.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-violet-500"
            />

            <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">
                    {user.name}
                </h1>

                <p className="text-gray-400">
                    {user.email}
                </p>
            </div>

            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition">
                Edit Profile
            </button>

        </div>
    );
};

export default ProfileHeader;