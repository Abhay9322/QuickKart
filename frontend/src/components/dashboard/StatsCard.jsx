const StatsCard = ({
    title,
    value,
    icon,
}) => {
    return (
        <div className="bg-white text-black rounded-xl shadow p-5 flex justify-between">
            <div>
                <p className="text-gray-500">
                    {title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                    {value}
                </h2>
            </div>

            <div className="text-green-600">
                {icon}
            </div>
        </div>
    );
};

export default StatsCard;