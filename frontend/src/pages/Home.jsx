import React, { useState, useEffect } from 'react'
import axios from "axios"
import Register from '../components/Register'
import ProductCard from '../components/ProductCard'

const Home = () => {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const getProducts = async () => {
        try {
            setLoading(true)
            const res = await axios.get("http://localhost:5000/api/v1/products")
            setProducts(res.data.data)
            setError("")
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/products/${id}`)
            if (res.status === 200) {
                alert("Deleted ✅")
                getProducts()
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const onEdit = async (id) => {
        try {
            const updatedData = { title: "Updated Product" } // example
            const res = await axios.put(`http://localhost:5000/api/v1/products/${id}`, updatedData)

            if (res.status === 200) {
                alert("Updated ✅")
                getProducts()
            }
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            {loading && <p>Loading...</p>}

            {products.map((p) => (
                <ProductCard
                    key={p._id}
                    product={p}
                    onDelete={() => onDelete(p._id)}
                    onEdit={() => onEdit(p._id)}
                />
            ))}

            {error && <p>Error: {error}</p>}

            <Register />
        </div>
    )
}

export default Home