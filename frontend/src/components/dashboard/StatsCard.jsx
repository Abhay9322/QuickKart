const StatsCard = ({ title, value, icon }) => {
    return (
        <div className="
            bg-white
            rounded-2xl
            shadow-lg
            border
            border-slate-200
            p-5
            flex
            justify-between
            items-center
            hover:shadow-xl
            transition-all
            duration-300
        ">
            <div>
                <p className="text-slate-500 text-sm font-medium">
                    {title}
                </p>

                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    {value}
                </h2>
            </div>

            <div className="
                bg-indigo-100
                text-indigo-600
                p-3
                rounded-xl
            ">
                {icon}
            </div>
        </div>
    );
};

export default StatsCard;