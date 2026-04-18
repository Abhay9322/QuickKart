import React from 'react'

const ProductCard = ({ product, onDelete, onEdit }) => {
    return (
        <div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={onDelete}>Delete</button>
            <button onClick={onEdit}>Edit</button>
        </div>
    )
}

export default ProductCard
