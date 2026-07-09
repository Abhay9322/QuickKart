const RecentOrders = () => {
    const orders = [
        {
            id: "#1001",
            customer: "Rahul",
            amount: "₹1200",
        },
        {
            id: "#1002",
            customer: "Priya",
            amount: "₹850",
        },
        {
            id: "#1003",
            customer: "Amit",
            amount: "₹2000",
        },
    ];

    return (
        <div className="
            bg-white
            rounded-2xl
            shadow-lg
            border
            border-slate-200
            overflow-hidden
        ">
            <div className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                px-6
                py-4
            ">
                <h2 className="text-xl font-bold text-white">
                    Recent Orders
                </h2>
            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-100">

                        <tr>
                            <th className="px-4 py-3 text-left">
                                Order ID
                            </th>

                            <th className="px-4 py-3 text-left">
                                Customer
                            </th>

                            <th className="px-4 py-3 text-left">
                                Amount
                            </th>
                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="
                                    border-b
                                    hover:bg-slate-50
                                    transition
                                "
                            >
                                <td className="px-4 py-4">
                                    {order.id}
                                </td>

                                <td className="px-4 py-4">
                                    {order.customer}
                                </td>

                                <td className="
                                    px-4
                                    py-4
                                    font-semibold
                                    text-green-600
                                ">
                                    {order.amount}
                                </td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>
        </div>
    );
};

export default RecentOrders;