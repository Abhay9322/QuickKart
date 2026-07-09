import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:5000/api/v1/users/users",
                {
                    withCredentials: true,
                }
            );

            setCustomers(response.data?.data || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = useMemo(() => {
        return customers.filter(
            (customer) =>
                customer.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                customer.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
        );
    }, [customers, search]);

    const totalCustomers = customers.length;

    const activeCustomers = customers.filter(
        (customer) =>
            customer.status === "Active"
    ).length;

    const inactiveCustomers =
        totalCustomers - activeCustomers;

    const totalOrders = customers.reduce(
        (total, customer) =>
            total + (customer.orders?.length || 0),
        0
    );

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 p-4 md:p-6">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-6">

                    <h1 className="text-3xl font-bold text-white">
                        Customers Management
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Manage customers and monitor activity
                    </p>

                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Total Customers
                        </h3>

                        <p className="text-3xl font-bold text-indigo-600 mt-2">
                            {totalCustomers}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Active Users
                        </h3>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {activeCustomers}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Inactive Users
                        </h3>

                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {inactiveCustomers}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Total Orders
                        </h3>

                        <p className="text-3xl font-bold text-amber-600 mt-2">
                            {totalOrders}
                        </p>
                    </div>

                </div>

                {/* Search */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search customer by name or email..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-lg
                            px-4
                            py-3
                            focus:ring-2
                            focus:ring-indigo-500
                            outline-none
                        "
                    />

                </div>

                {/* Customers Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

                    {loading ? (
                        <div className="text-center py-12 text-slate-500">
                            Loading Customers...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead className="bg-indigo-600 text-white">

                                    <tr>

                                        <th className="px-4 py-4 text-left">
                                            Name
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Email
                                        </th>

                                        <th className="px-4 py-4 text-center">
                                            Orders
                                        </th>

                                        <th className="px-4 py-4 text-center">
                                            Status
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map(
                                            (customer) => (
                                                <tr
                                                    key={
                                                        customer._id
                                                    }
                                                    className="
                                                        border-b
                                                        hover:bg-slate-50
                                                        transition
                                                    "
                                                >
                                                    <td className="px-4 py-4 font-medium text-slate-800">
                                                        {
                                                            customer.name
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-slate-600">
                                                        {
                                                            customer.email
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-center">
                                                        {
                                                            customer
                                                                .orders
                                                                ?.length || 0
                                                        }
                                                    </td>

                                                    <td className="px-4 py-4 text-center">

                                                        <span
                                                            className={`px-3 py-1 rounded-full text-sm font-medium ${customer.status ===
                                                                    "Active"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {customer.status ||
                                                                "Inactive"}
                                                        </span>

                                                    </td>

                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="
                                                    text-center
                                                    py-12
                                                    text-slate-500
                                                "
                                            >
                                                No Customers Found
                                            </td>

                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Customers;