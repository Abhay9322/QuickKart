import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all duration-300">

            {/* Product Image */}
            <div className="h-44 overflow-hidden">

                <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

            </div>

            {/* Content */}
            <div className="p-4">

                <p className="text-violet-400 text-xs uppercase tracking-wide">
                    {product.category.name}
                </p>

                <h3 className="text-white font-semibold text-base mt-1 line-clamp-1">
                    {product.title}
                </h3>

                <p className="text-xl font-bold text-white mt-2">
                    RS {product.price}
                </p>

                <button className="w-full mt-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium hover:opacity-90 transition cursor-pointer" onClick={onAddToCart}>
                    Add to Cart
                </button>

            </div>

        </div>
    );
};

export default ProductCard;