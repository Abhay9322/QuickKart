import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    withCredentials: true,
                }
            );

            setProducts(response.data.data || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://localhost:5000/api/v1/products/${id}`,
                {
                    withCredentials: true,
                }
            );

            setProducts((prev) =>
                prev.filter((product) => product._id !== id)
            );

            alert("Product Deleted Successfully");
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.title
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [products, search]);

    const totalProducts = products.length;

    const inStockProducts = products.filter(
        (p) => p.stock > 10
    ).length;

    const lowStockProducts = products.filter(
        (p) => p.stock > 0 && p.stock <= 10
    ).length;

    const outOfStockProducts = products.filter(
        (p) => p.stock === 0
    ).length;

    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 p-4 md:p-6 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Products Management
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Manage products, stock and categories
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Total Products
                        </h3>

                        <p className="text-3xl font-bold text-indigo-600 mt-2">
                            {totalProducts}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            In Stock
                        </h3>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {inStockProducts}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Low Stock
                        </h3>

                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {lowStockProducts}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-5 border border-slate-200">
                        <h3 className="text-slate-500">
                            Out Of Stock
                        </h3>

                        <p className="text-3xl font-bold text-red-600 mt-2">
                            {outOfStockProducts}
                        </p>
                    </div>

                </div>

                {/* Search & Add */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 mb-6">

                    <div className="flex flex-col md:flex-row gap-3">

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                flex-1
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

                        <button
                            onClick={() =>
                                navigate("/admin/createProduct")
                            }
                            className="
                                bg-emerald-600
                                hover:bg-emerald-700
                                text-white
                                px-5
                                py-3
                                rounded-lg
                                shadow
                            "
                        >
                            + Add Product
                        </button>

                    </div>

                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

                    {loading ? (
                        <div className="text-center py-12 text-slate-500">
                            Loading Products...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">

                            <table className="min-w-full">

                                <thead className="bg-indigo-600 text-white">
                                    <tr>
                                        <th className="px-4 py-4 text-left">
                                            Image
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Product
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Price
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Category
                                        </th>

                                        <th className="px-4 py-4 text-left">
                                            Stock
                                        </th>

                                        <th className="px-4 py-4 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <tr
                                                key={product._id}
                                                className="border-b hover:bg-slate-50 transition"
                                            >
                                                <td className="px-4 py-4">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-14 h-14 rounded-lg object-cover"
                                                    />
                                                </td>

                                                <td className="px-4 py-4 font-semibold text-slate-800">
                                                    {product.title}
                                                </td>

                                                <td className="px-4 py-4 font-semibold text-green-600">
                                                    ₹{product.price}
                                                </td>

                                                <td className="px-4 py-4">
                                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                                                        {
                                                            product.category
                                                                ?.name
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-4 py-4">

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 10
                                                                ? "bg-green-100 text-green-700"
                                                                : product.stock > 0
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {product.stock}
                                                    </span>

                                                </td>

                                                <td className="px-4 py-4">

                                                    <div className="flex flex-col md:flex-row gap-2 justify-center">

                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/products/edit/${product._id}`
                                                                )
                                                            }
                                                            className="
                                                                bg-amber-500
                                                                hover:bg-amber-600
                                                                text-white
                                                                px-4
                                                                py-2
                                                                rounded-lg
                                                            "
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product._id
                                                                )
                                                            }
                                                            className="
                                                                bg-red-600
                                                                hover:bg-red-700
                                                                text-white
                                                                px-4
                                                                py-2
                                                                rounded-lg
                                                            "
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
                                                className="text-center py-12 text-slate-500"
                                            >
                                                No Products Found
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

export default Products;