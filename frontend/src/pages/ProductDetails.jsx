import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async () => {
        try {

            const response = await axios.get(
                `http://localhost:5000/api/v1/products/${id}`
            );

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
        <div>
            <h1>{product.name}</h1>
            <img
                src={product.image}
                alt={product.name}
            />
            <h2>₹{product.price}</h2>
            <p>{product.description}</p>
        </div>
    );
};

export default ProductDetails;