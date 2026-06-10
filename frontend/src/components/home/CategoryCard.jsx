// src/components/home/CategoryCard.jsx
import React from "react";

const CategoryCard = ({ title, emoji }) => {
    return (
        <div className="bg-gray-100 hover:bg-black hover:text-white transition p-6 text-center cursor-pointer text-black">
            <h3 className="font-semibold">{title}{"  "}{emoji}</h3>
        </div>
    );
};

export default CategoryCard;