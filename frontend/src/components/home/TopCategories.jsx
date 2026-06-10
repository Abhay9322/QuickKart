import React from "react";
import CategoryCard from "./CategoryCard";

const TopCategories = () => {
    const categories = [
        { name: "Grains", emoji: "🌾" },
        { name: "Fruits", emoji: "🍎" },
        { name: "Vegetables", emoji: "🥦" },
        { name: "Dairy", emoji: "🥛" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">

            {/* HEADER */}
            <div className="text-center mb-12">

                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    Shop By Category
                </h2>

                <p className="text-gray-400 mt-3">
                    Fresh produce directly from Indian farmers 🌱
                </p>

            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {categories.map((cat, index) => (
                    <CategoryCard
                        key={index}
                        title={cat.name}
                        emoji={cat.emoji}
                    />
                ))}

            </div>

        </section>
    );
};

export default TopCategories;