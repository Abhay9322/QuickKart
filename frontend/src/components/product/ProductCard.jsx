import React from 'react'
import "./productCard.css"

const ProductCard = ({ product, onAdd }) => {
    return (
        <div className="product-card">

            {/* Image */}
            <img
                src={product.image}
                alt={product.title}
                className="product-img"
            />

            {/* Body */}
            <div className="product-body">

                <h5 className="product-title">
                    {product.title}
                </h5>

                <p className="product-desc">
                    {product.description}
                </p>

                <p className="product-price">
                    ₹ {product.price}
                </p>

                <button
                    className="addTo-btn"
                    onClick={onAdd}
                >
                    AddToCart
                </button>

            </div>
        </div>
    )
}

export default ProductCard