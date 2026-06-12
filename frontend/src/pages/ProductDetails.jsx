import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {

    const { cartItems, total, increaseQty, decreaseQty, handleRemove, onAddToCart } = useContext(CartContext)

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBuyNow = async () => {
        onAddToCart(product._id);
        navigate("/checkout");
    }

    const navigate = useNavigate()

    const fetchProduct = async () => {
        try {

            const response = await axios.get(
                `http://localhost:5000/api/v1/products/${id}`
            );


            console.log("Product detail is ", response);

            setProduct(response.data.data);

        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white">
                Loading Product...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#050816] flex items-center justify-center text-red-500">
                Product Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050816] text-white px-4 py-10">

            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Product Image */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

                        <img
                            src={product.images?.[0]?.url}
                            alt={product.title}
                            className="w-full h-[500px] object-cover rounded-2xl"
                        />

                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">

                        <div>
                            <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                {product.category?.name}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold">
                            {product.title}
                        </h1>

                        <p className="text-3xl font-bold text-green-400">
                            ₹{product.price}
                        </p>

                        <div className="flex flex-wrap gap-3">

                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                Stock: {product.stock}
                            </div>

                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                Sold: {product.sold}
                            </div>

                            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                Quantity: {product.quantity?.value}{" "}
                                {product.quantity?.unit}
                            </div>

                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">
                                Description
                            </h2>

                            <p className="text-gray-400 leading-7">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">

                            <button
                                className="flex-1 py-4 rounded-2xl bg-green-600 hover:bg-green-500 transition font-semibold"
                                onClick={() => onAddToCart(product._id)}
                            >
                                Add To Cart
                            </button>

                            <button
                                className="flex-1 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition font-semibold"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;