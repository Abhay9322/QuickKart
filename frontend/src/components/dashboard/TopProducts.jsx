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
        <div className="bg-white text-black shadow rounded-xl p-5">
            <h2 className="font-semibold text-lg mb-4">
                Recent Orders
            </h2>

            <table className="w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrders;