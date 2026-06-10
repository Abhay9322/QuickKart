// src/pages/Home.jsx
import React from "react";

// Components
import HeroSection from "../components/home/HeroSection";
import TopCategories from "../components/home/TopCategories";
import TrendingProducts from "../components/home/TrendingProducts";

const Home = () => {
    return (
        <div className="bg-[#050816] min-h-screen text-white">

            {/* HERO SECTION */}
            <HeroSection />

            {/* TOP CATEGORIES */}
            <TopCategories />

            {/* TRENDING PRODUCTS */}
            <TrendingProducts />

        </div>
    );
};

export default Home;