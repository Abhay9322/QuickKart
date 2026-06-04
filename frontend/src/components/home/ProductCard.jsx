import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-violet-500/40 transition-all duration-300">

            {/* Product Image */}
            <div className="h-60 overflow-hidden">

                <img
                    src={product?.images[0]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

            </div>

            {/* Content */}
            <div className="p-5">

                <p className="text-violet-400 text-sm">
                    {product.category.name}
                </p>

                <h3 className="text-white font-semibold text-lg mt-1">
                    {product.title}
                </h3>

                <p className="text-2xl font-bold text-white mt-3">
                    Rs{product.price}
                </p>

                <button className="w-full mt-5 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition cursor-pointer" onClick={onAddToCart}>
                    Add to Cart
                </button>

            </div>

        </div>
    );
};

export default ProductCard;