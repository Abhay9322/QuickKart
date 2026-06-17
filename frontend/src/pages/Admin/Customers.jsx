import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/users/users",
                    {
                        withCredentials: true,
                    }
                );

                console.log("API DATA:", response.data);

                setCustomers(response.data?.data || []);
            } catch (error) {
                console.log(error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <div className="flex-1 p-6 overflow-x-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    Customers Management
                </h1>

                <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

                    {loading ? (
                        <div className="p-10 text-center text-slate-500">
                            Loading customers...
                        </div>
                    ) : customers.length === 0 ? (
                        <div className="p-10 text-center text-slate-500">
                            No Customers Found
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-center">Orders</th>
                                    <th className="p-4 text-center">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customers.map((customer) => (
                                    <tr
                                        key={customer._id}
                                        className="border-b hover:bg-slate-50 transition"
                                    >
                                        <td className="p-4 font-medium text-slate-800">
                                            {customer.name || "N/A"}
                                        </td>

                                        <td className="p-4 text-slate-600">
                                            {customer.email || "N/A"}
                                        </td>

                                        <td className="p-4 text-center">
                                            {customer.orders?.length || 0}
                                        </td>

                                        <td className="p-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${customer.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {customer.status || "Inactive"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Customers;