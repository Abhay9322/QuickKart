// src/pages/Shop.jsx

import React from "react";
import ProductCard from "../components/shop/ProductCard";

const Shop = () => {
    const products = [
        {
            id: 1,
            name: "Elite Runner Pro",
            category: "Shoes",
            price: 129,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
            description:
                "Premium lightweight running shoes for maximum comfort.",
        },
        {
            id: 2,
            name: "Urban Hoodie",
            category: "Hoodies",
            price: 89,
            image:
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
            description:
                "Premium cotton hoodie for everyday comfort.",
        },
        {
            id: 3,
            name: "Smart Watch",
            category: "Accessories",
            price: 249,
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            description:
                "Track fitness, heart rate and daily activities.",
        },
        {
            id: 4,
            name: "Training Tracksuit",
            category: "Tracksuit",
            price: 149,
            image:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
            description:
                "Breathable tracksuit built for training sessions.",
        },
        {
            id: 3,
            name: "Smart Watch",
            category: "Accessories",
            price: 249,
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            description:
                "Track fitness, heart rate and daily activities.",
        },
        {
            id: 4,
            name: "Training Tracksuit",
            category: "Tracksuit",
            price: 149,
            image:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
            description:
                "Breathable tracksuit built for training sessions.",
        },
    ];

    return (
        <div className="relative min-h-screen bg-[#050816] overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 blur-[180px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                <div className="text-center mb-12">

                    <p className="text-violet-400 tracking-[4px] uppercase text-sm">
                        Premium Collection
                    </p>

                    <h1 className="text-5xl font-bold text-white mt-3">
                        Shop
                    </h1>

                    <p className="text-gray-400 mt-4">
                        Discover our latest products.
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Shop;