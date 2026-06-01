import React from "react";
import ProductCard from "./ProductCard";

const TrendingProducts = () => {
    const products = [
        {
            id: 1,
            name: "Elite Runner",
            category: "Shoes",
            price: 120,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
        {
            id: 2,
            name: "Urban Hoodie",
            category: "Hoodies",
            price: 90,
            image:
                "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
        },
        {
            id: 3,
            name: "Pro Tracksuit",
            category: "Tracksuits",
            price: 150,
            image:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
        },
        {
            id: 4,
            name: "Gym Bag",
            category: "Accessories",
            price: 60,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
        },
    ];

    return (
        <section className="py-20 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold text-white">
                        Trending Products
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Most loved by our customers
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
};

export default TrendingProducts;