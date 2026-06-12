import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
import { CartContext } from "../../context/CartContext";
import { toast } from "sonner";

const TrendingProducts = () => {

    const [products, setProducts] = useState([]);
    const { getCartItems } = useContext(CartContext);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/products",
                { withCredentials: true }
            );

            setProducts(response.data.data);

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    // const onAddToCart = async (productId) => {
    //     try {
    //         const res = await axios.post(
    //             `http://localhost:5000/api/v1/cart/${productId}`,
    //             {},
    //             { withCredentials: true }
    //         );
    //         console.log("Response is ", res);


    //         alert("Added to cart 🌱");

    //     } catch (error) {
    //         console.log(error.response?.data);
    //     }
    // };

    const onAddToCart = async (productId) => {
        try {
            const res = await axios.post(
                `http://localhost:5000/api/v1/cart/${productId}`,
                {},
                { withCredentials: true }
            );

            console.log("Response is:", res);

            // const items = await getCartItems(); // cart refresh
            // console.log("Items are:", items);


            // alert("Added to cart 🌱");
            toast.success("Item added to cart successfully");

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <section className="py-24 px-6 relative">

            {/* BACKGROUND GLOW (match home theme) */}
            <div className="absolute inset-0 bg-[radial-gradient(#14532d_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            <div className="relative max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-14">

                    <p className="text-green-400 tracking-[5px] uppercase text-xs">
                        Fresh From Farms
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                        Trending Farm Products
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Directly harvested from trusted Indian farmers 🌾
                    </p>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {products.map((item) => (
                        <ProductCard
                            key={item._id}
                            product={item}
                            onAddToCart={() => onAddToCart(item._id)}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
};

export default TrendingProducts;