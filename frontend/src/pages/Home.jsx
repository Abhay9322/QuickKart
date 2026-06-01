// src/pages/Home.jsx
import React from "react";

import HeroSection from "../components/home/HeroSection";
import TopCategories from "../components/home/TopCategories";
import TrendingProducts from "../components/home/TrendingProducts";

const Home = () => {
    return (
        <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 blur-[180px]" />

            <div className="relative z-10">
                <HeroSection />
                <TopCategories />
                <TrendingProducts />
            </div>

        </div>
    );
};

export default Home;