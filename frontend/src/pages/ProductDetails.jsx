// src/pages/ProductDetails.jsx

import React from "react";
import ProductCard from "../components/shop/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";

const ProductDetails = () => {
    // const product = {
    //     name: "ELITE Runner Pro",
    //     price: 129,
    //     description:
    //         "Premium lightweight running shoes designed for maximum comfort, performance, and durability. Built for elite athletes and daily runners.",
    //     image:
    //         "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
    // };

    const [product, setProduct] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/products/69ecd44f885dbe18853bf792")
            console.log("Products fetched succesfully", response?.data);
            const data = response.data
            setProduct(data.data)

            alert("Products fetched successfully")

        } catch (error) {
            console.log(error.response.data);

        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className="relative min-h-screen bg-[#050816] overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Violet Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 blur-[180px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

                {/* Product Card */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">

                    <div className="grid lg:grid-cols-2 gap-10 p-8 lg:p-12">

                        {/* Product Image */}
                        <div className="relative group">

                            <div className="overflow-hidden rounded-3xl border border-white/10">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
                                />

                            </div>

                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center">

                            <span className="text-violet-400 tracking-[4px] text-sm uppercase">
                                Premium Collection
                            </span>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3">
                                {product.title}
                            </h1>

                            <p className="text-3xl font-bold text-white mt-5">
                                ${product.price}
                            </p>

                            <p className="text-gray-400 leading-relaxed mt-6">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="mt-8 space-y-3">

                                <div className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    Free Delivery Available
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    7-Day Return Policy
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    Premium Quality Materials
                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-10">

                                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition">
                                    Add to Cart
                                </button>

                                <button className="px-8 py-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition">
                                    Buy Now
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetails;