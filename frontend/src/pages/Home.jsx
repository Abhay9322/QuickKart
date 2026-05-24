import React from 'react'
import ProductList from '../components/product/ProductList'
import "./Home.css"
import Hero from '../components/Hero/Hero'

const Home = () => {
    return (
        <div className="home">

            {/* HERO SECTION */}

            <Hero />

            {/* CATEGORIES */}
            <div className="categories">
                <h2>Shop by Category</h2>
                <div className="category-list">
                    <div className="category-card">Electronics</div>
                    <div className="category-card">Fashion</div>
                    <div className="category-card">Home</div>
                    <div className="category-card">Beauty</div>
                    <div className="category-card">Sports</div>
                </div>
            </div>

            {/* PRODUCTS */}
            <div className="products-section">
                <h2>Latest Products</h2>
                <ProductList />
            </div>

        </div>
    )
}

export default Home