import { useEffect, useState } from "react"
import "./ProductList.css"
import ProductCard from "./ProductCard"
import { getProducts, deleteProductById } from "../../services/productService"
import { addToCart } from "../../services/cartService"
import { useNavigate } from "react-router-dom"

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const onAdd = async (id) => {
        try {
            const res = await addToCart(id)

            if (res.status === 201) {
                alert("Added to cart ✅")
            }

        } catch (error) {
            setError(error.response?.data?.message || "Add to cart failed")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getProducts()
                setProducts(res.data.data)
            } catch (err) {
                setError(err.message || "Failed to load product")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <div className="product-list">
            {products.map((p) => (
                <ProductCard
                    key={p._id}
                    product={p}
                    onAdd={() => onAdd(p._id)}
                />
            ))}
        </div>
    )
}

export default ProductList