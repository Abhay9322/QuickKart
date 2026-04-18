import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useParams, useNavigate } from 'react-router-dom'

const ProductDetails = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const getProductById = async () => {
        try {
            setLoading(true)

            const response = await axios.get(
                `http://localhost:5000/api/v1/products/${id}`
            )

            setProduct(response.data.data)

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            const res = await axios.delete(
                `http://localhost:5000/api/v1/products/${id}`
            )

            if (res.status === 200) {
                alert("Deleted ✅")
                navigate("/") // redirect after delete
            }

        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if (id) {
            getProductById()
        }
    }, [id])

    if (loading) return <p>Loading...</p>

    return (
        <div>
            {error && <p>Error: {error}</p>}

            {product && (
                <ProductCard
                    product={product}
                    onDelete={onDelete}
                />
            )}
        </div>
    )
}

export default ProductDetails