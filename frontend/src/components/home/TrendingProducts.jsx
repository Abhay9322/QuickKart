import React from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";

const TrendingProducts = () => {
    // const products = [
    //     {
    //         id: 1,
    //         name: "Elite Runner",
    //         category: "Shoes",
    //         price: 120,
    //         image:
    //             "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    //     },
    //     {
    //         id: 2,
    //         name: "Urban Hoodie",
    //         category: "Hoodies",
    //         price: 90,
    //         image:
    //             "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
    //     },
    //     {
    //         id: 3,
    //         name: "Pro Tracksuit",
    //         category: "Tracksuits",
    //         price: 150,
    //         image:
    //             "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
    //     },
    //     {
    //         id: 4,
    //         name: "Gym Bag",
    //         category: "Accessories",
    //         price: 60,
    //         image:
    //             "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    //     },
    //     {
    //         id: 5,
    //         name: "Pro Tracksuit",
    //         category: "Tracksuits",
    //         price: 150,
    //         image:
    //             "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
    //     },
    //     {
    //         id: 6,
    //         name: "Gym Bag",
    //         category: "Accessories",
    //         price: 60,
    //         image:
    //             "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    //     },
    //     {
    //         id: 7,
    //         name: "Pro Tracksuit",
    //         category: "Tracksuits",
    //         price: 150,
    //         image:
    //             "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
    //     },
    //     {
    //         id: 8,
    //         name: "Gym Bag",
    //         category: "Accessories",
    //         price: 60,
    //         image:
    //             "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    //     },
    // ];

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
        <section className="py-20 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold text-white">
                        Fresh Farm Products
                    </h2>

                    <p className="text-gray-400 mt-3">
                        Directly sourced from trusted farmers
                    </p>

                </div>

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