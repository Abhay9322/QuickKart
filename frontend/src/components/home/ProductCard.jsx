import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {

    const navigate = useNavigate()

    return (
        <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-green-500/40 transition-all duration-300 cursor-pointer"
        >

            {/* IMAGE */}
            <div className="h-60 overflow-hidden" onClick={() => navigate(`/product/${product._id}`)}>

                <img
                    src={product?.images?.[0]?.url || "https://images.unsplash.com/photo-1542838132-92c53300491e"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

            </div>

            {/* CONTENT */}
            <div className="p-5">

                {/* CATEGORY */}
                <p className="text-green-400 text-sm">
                    {product?.category?.name || "Fresh Produce"}
                </p>

                {/* TITLE */}
                <h3 className="text-white font-semibold text-lg mt-1">
                    {product.title}
                </h3>

                {/* PRICE */}
                <p className="text-2xl font-bold text-white mt-3">
                    ₹{product.price}
                </p>

                {/* BUTTON */}
                <button
                    onClick={onAddToCart}
                    className="w-full mt-5 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white font-medium transition cursor-pointer"
                >
                    Add to Cart
                </button>

            </div>

        </div>
    );
};

export default ProductCard;