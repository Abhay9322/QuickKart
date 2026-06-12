import React from "react";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product, onAddToCart }) => {

    const navigate = useNavigate();
    return (
        <div
            className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/40 transition cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
        >

            <div className="h-44 overflow-hidden">
                <img
                    src={product.images?.[0]?.url}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                />
            </div>

            <div className="p-4">

                <p className="text-violet-400 text-xs uppercase tracking-widest">
                    {product.category.name}
                </p>

                <h3 className="text-white font-semibold mt-1 line-clamp-1">
                    {product.title}
                </h3>

                <p className="text-white font-bold mt-2">
                    ₹{product.price}
                </p>

                <button className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r  bg-green-600 hover:bg-green-500 hover:scale-[1.02] transition cursor-pointer" onClick={onAddToCart}>
                    Add to Cart
                </button>

            </div>
        </div>
    );
};

export default ProductCard;