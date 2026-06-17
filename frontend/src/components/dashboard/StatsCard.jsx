const StatsCard = ({ title, value, icon }) => {
    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 flex justify-between items-center">

            <div>
                <p className="text-slate-500 text-sm">{title}</p>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    {value}
                </h2>
            </div>

            <div className="text-emerald-600">
                {icon}
            </div>

        </div>
    );
};

export default StatsCard;