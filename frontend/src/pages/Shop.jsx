// src/pages/Shop.jsx

import React, { useEffectEvent } from "react";
import ProductCard from "../components/shop/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";

const Shop = () => {

    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/products", { withCredentials: true })
            console.log("Products fetched succesfully", response?.data);
            const data = response.data
            setProducts(data.data)

        } catch (error) {
            console.log(error.response.data);

        }
    }
    const onAddToCart = async (productId) => {

        try {
            const response = await axios.post(`http://localhost:5000/api/v1/cart/${productId}`, {}, { withCredentials: true })
            console.log("Item added to cart succesfully", response);

            alert("Item added to cart succesfully")

        } catch (error) {
            console.log(error.response.data);

        }
    }



    useEffect(() => {
        fetchProducts()
    }, [])

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
                            key={product._id}
                            product={product}
                            onAddToCart={() => onAddToCart(product._id)}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Shop;