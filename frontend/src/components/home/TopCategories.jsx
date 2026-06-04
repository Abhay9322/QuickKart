import React from "react";
import CategoryCard from "./CategoryCard";

const TopCategories = () => {
    const categories = [
        "Grains",
        "Fruits",
        "Vegetables",
        "Dairy",
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">

            <div className="text-center mb-12">

                <h2 className="text-4xl font-bold text-white">
                    Shop By Category
                </h2>

                <p className="text-gray-400 mt-3">
                    Fresh produce sourced directly from farmers
                </p>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black
            ">
                {categories.map((cat, index) => (
                    <CategoryCard key={index} title={cat} />
                ))}
            </div>

        </section>
    );
};

export default TopCategories;