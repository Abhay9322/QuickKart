import React from "react";
import Sidebar from "../../components/layout/Sidebar";

const Farmers = () => {
    const farmers = [
        {
            id: 1,
            name: "Ramesh Patil",
            email: "ramesh@gmail.com",
            status: "Verified",
        },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">

                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    Farmers Management
                </h1>

                <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-100 text-slate-700">
                            <tr>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {farmers.map((farmer) => (
                                <tr
                                    key={farmer.id}
                                    className="border-b hover:bg-slate-50 transition"
                                >
                                    <td className="p-4 font-medium text-slate-800">
                                        {farmer.name}
                                    </td>

                                    <td className="p-4 text-slate-600">
                                        {farmer.email}
                                    </td>

                                    <td className="p-4">
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">
                                            {farmer.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
};

export default Farmers;