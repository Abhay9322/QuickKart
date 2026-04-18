import axios from 'axios'
import React, { useState } from 'react'

const ProductCreate = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [featured, setFeatured] = useState(false)
    const [stock, setStock] = useState(0)
    const [categoryID, setCategoryID] = useState("")
    const [images, setImages] = useState([])
    const [error, setError] = useState()

    const handleCreate = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/v1/products")
            if (response.status === 201 || response.status === 200) {
                alert("Product created successfully")
            }

        } catch (error) {
            setError(error.message)
            console.log("Error is :", error.message);

        }
    }

    const handleUpdate = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/products/${id}`)
            if (response.status === 201 || response.status === 200) {
                alert("Product updated successfully")
            }

        } catch (error) {
            setError(error.message)
            console.log("Error is :", error.message);

        }
    }
    return (
        <div>
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="featured">Featured: </label>
                    <input type="radio" name="featured" id="featured" value={featured} onChange={(e) => setFeatured(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="stock">Stock: </label>
                    <input type="number" name="stock" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="categoryID">CategoryID: </label>
                    <input type="text" name="categoryID" id="categoryID" value={categoryID} onChange={(e) => setCategoryID(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="images">Images: </label>
                    <input type="file" name="images" id="images" value={images} onChange={(e) => setImages(e.target.value)} />
                </div>
                <button type="submit">Create Product</button>
            </form>
        </div>
    )
}

export default ProductCreate
