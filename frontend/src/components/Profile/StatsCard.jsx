import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-xl hover:border-green-500/30 transition-all duration-300">

            <div>
                <p className="text-gray-400 text-xs sm:text-sm">
                    {title}
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                    {value}
                </h2>
            </div>

            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <Icon
                    size={24}
                    className="text-green-400 sm:w-7 sm:h-7"
                />
            </div>

        </div>
    );
};

export default StatsCard;