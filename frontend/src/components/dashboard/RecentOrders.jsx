const RecentOrders = () => {
    const orders = [
        { id: "#1001", customer: "Rahul", amount: "₹1200" },
        { id: "#1002", customer: "Priya", amount: "₹850" },
        { id: "#1003", customer: "Amit", amount: "₹2000" },
    ];

    return (
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5">

            <h2 className="font-semibold text-lg text-slate-900 mb-4">
                Recent Orders
            </h2>

            <table className="w-full text-left">

                <thead className="text-slate-600 border-b">
                    <tr>
                        <th className="py-2">ID</th>
                        <th className="py-2">Customer</th>
                        <th className="py-2">Amount</th>
                    </tr>
                </thead>

                <tbody className="text-slate-700">
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-slate-50">
                            <td className="py-2">{order.id}</td>
                            <td className="py-2">{order.customer}</td>
                            <td className="py-2 font-medium">{order.amount}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default RecentOrders;