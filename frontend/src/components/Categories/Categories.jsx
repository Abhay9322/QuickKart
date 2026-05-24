import React from "react"
import "./Categories.css"

const categories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"]

const Categories = () => {
    return (
        <div className="categories">

            <h2>Categories</h2>

            <div className="category-list">
                {categories.map((cat, index) => (
                    <div key={index} className="category-card">
                        {cat}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Categories