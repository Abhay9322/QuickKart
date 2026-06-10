import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/shop/ProductCard";

const Shop = () => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/products",
                { withCredentials: true }
            );

            setProducts(response.data.data);

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const onAddToCart = async (productId) => {
        try {
            await axios.post(
                `http://localhost:5000/api/v1/cart/${productId}`,
                {},
                { withCredentials: true }
            );

            alert("Added to cart 🌱");

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden">

            {/* Background Pattern (global system) */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Green Glow (Kisan theme) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-green-600/20 blur-[180px]" />

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

                {/* HEADER */}
                <div className="text-center mb-12">

                    <p className="text-green-400 tracking-[4px] uppercase text-sm">
                        Fresh Farm Collection
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-bold mt-3">
                        Shop Fresh Products
                    </h1>

                    <p className="text-gray-400 mt-4">
                        Direct from farmers to your home
                    </p>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={() => onAddToCart(product._id)}
                        />
                    ))}

                </div>

            </div>
        </div>
    );
};

export default Shop;