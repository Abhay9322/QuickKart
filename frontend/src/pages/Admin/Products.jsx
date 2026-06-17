import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";


const Products = () => {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate()


    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/v1/products/${id}`,
                {
                    withCredentials: true,
                }
            );

            setProducts(products.filter((p) => p._id !== id));


        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/products",

                    {
                        withCredentials: true,
                    }
                );

                setProducts(response.data.data || []);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        };

        fetchProducts();
    }, []);
    return (
        <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Products Management
                        </h1>
                        <p className="text-slate-600">
                            Manage all products in your system
                        </p>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search product..."
                            className="border border-slate-200 bg-white px-4 py-2 rounded-lg w-full md:w-72 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />

                        <button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
                            onClick={() => navigate("/admin/createProduct")}
                        >
                            + Add Product
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-100 text-slate-700">
                                <tr>
                                    <th className="p-4 text-left">Image</th>
                                    <th className="p-4 text-left">Product</th>
                                    <th className="p-4 text-left">Price</th>
                                    <th className="p-4 text-left">Category</th>
                                    <th className="p-4 text-left">Stock</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length > 0 ? (
                                    products.map((p) => (
                                        <tr
                                            key={p._id}
                                            className="border-b hover:bg-slate-50 transition"
                                        >
                                            <td className="p-4">
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="w-14 h-14 rounded-lg object-cover"
                                                />
                                            </td>

                                            <td className="p-4 font-medium text-slate-800">
                                                {p.title}
                                            </td>

                                            <td className="p-4 text-slate-700">
                                                ₹{p.price}
                                            </td>

                                            <td className="p-4">
                                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                                                    {p.category?.name}
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm ${p.stock > 10
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : "bg-red-100 text-red-600"
                                                        }`}
                                                >
                                                    {p.stock} in stock
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">

                                                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition">
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                                                        onClick={() =>
                                                            handleDelete(p._id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-10 text-slate-500"
                                        >
                                            No Products Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Products;