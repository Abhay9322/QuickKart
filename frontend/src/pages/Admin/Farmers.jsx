import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/layout/Sidebar";

const Farmers = () => {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFarmers();
    }, []);

    const fetchFarmers = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:5000/api/v1/farmers",
                {
                    withCredentials: true,
                }
            );

            setFarmers(response.data.data || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 p-4 md:p-6">

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-lg mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Farmers Management
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Manage all registered farmers
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

                    {loading ? (
                        <div className="text-center py-10">
                            Loading Farmers...
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

                                        <th className="px-4 py-4 text-left">
                                            Phone
                                        </th>

                                        <th className="px-4 py-4 text-center">
                                            Status
                                        </th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {farmers.length > 0 ? (
                                        farmers.map((farmer) => (
                                            <tr
                                                key={farmer._id}
                                                className="border-b hover:bg-slate-50"
                                            >
                                                <td className="px-4 py-4">
                                                    {farmer.name}
                                                </td>

                                                <td className="px-4 py-4">
                                                    {farmer.email}
                                                </td>

                                                <td className="px-4 py-4">
                                                    {farmer.phone}
                                                </td>

                                                <td className="px-4 py-4 text-center">

                                                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                                                        {farmer.status}
                                                    </span>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center py-10"
                                            >
                                                No Farmers Found
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

export default Farmers;