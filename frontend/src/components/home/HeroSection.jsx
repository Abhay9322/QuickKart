import React from "react";

const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">

            {/* Background Image (Farm theme) */}
            <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
                alt="Farm field"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Green Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/30 via-black/50 to-[#050816]" />

            {/* CONTENT */}
            <div className="relative z-10 text-center max-w-3xl">

                {/* TAGLINE */}
                <p className="text-green-400 tracking-[6px] text-xs sm:text-sm mb-4">
                    DIRECT FROM FARMERS • FRESH • ORGANIC
                </p>

                {/* TITLE */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
                    KisanBazar
                </h1>

                {/* SUBTITLE */}
                <p className="text-gray-300 mt-6 text-base sm:text-lg leading-relaxed">
                    Bringing farmers and customers together — fresh fruits,
                    vegetables, grains, and organic farm products delivered
                    directly from the fields to your home 🌱
                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap justify-center gap-4 mt-10">

                    <button className="px-7 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition font-semibold">
                        Shop Fresh Products
                    </button>

                    <button className="px-7 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
                        Explore Categories
                    </button>

                </div>

            </div>

        </section>
    );
};

export default HeroSection;