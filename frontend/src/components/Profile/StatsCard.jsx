import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center justify-between shadow-xl hover:border-green-500/30 transition-all">

            {/* TEXT */}
            <div>
                <p className="text-gray-400 text-sm">
                    {title}
                </p>

                <h2 className="text-3xl font-bold text-white mt-1">
                    {value}
                </h2>
            </div>

            {/* ICON */}
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <Icon
                    size={28}
                    className="text-green-400"
                />
            </div>

        </div>
    );
};

export default StatsCard;