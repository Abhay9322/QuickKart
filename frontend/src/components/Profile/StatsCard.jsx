import React from "react";

const StatsCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-5 flex items-center justify-between shadow-xl">

            <div>
                <p className="text-gray-400 text-sm">
                    {title}
                </p>

                <h2 className="text-3xl font-bold text-white">
                    {value}
                </h2>
            </div>

            <Icon
                size={34}
                className="text-violet-400"
            />

        </div>
    );
};

export default StatsCard;