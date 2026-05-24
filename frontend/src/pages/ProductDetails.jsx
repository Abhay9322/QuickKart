import './ProductDetails.css'
import React, { useState, useEffect } from 'react'
import ProductCard from '../components/product/ProductCard'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteProductById, getProductById } from '../services/productService'

const ProductDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const fetchProduct = async (id) => {
        try {
            setLoading(true)

            const response = await getProductById(id)
            setProduct(response.data.data)

        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || "Error fetching product")

        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this product?")
            if (!confirmDelete) return

            const res = await deleteProductById(id)

            if (res.status === 200) {
                alert("Deleted ✅")
                navigate("/")
            }

        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || "Delete failed")
        }
    }

    useEffect(() => {
        if (id) {
            fetchProduct(id)
        }
    }, [id])

    return (
        <div className="product-details-container">

            {loading && <p className="loading-text">Loading product...</p>}

            {error && <p className="error-text">{error}</p>}

            {product && (
                <div className="product-grid">
                    <ProductCard
                        product={product}
                        onDelete={onDelete}
                    />
                </div>
            )}

        </div>
    )
}

export default ProductDetails