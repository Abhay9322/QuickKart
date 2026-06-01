import React from "react";

const HeroSection = () => {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">

            {/* Background Image */}
            <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
                alt="Ecommerce Fashion Store"
                className="absolute inset-0 w-full h-full object-cover"
            />


            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Violet Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-black/40 to-[#050816]" />

            {/* Content */}
            <div className="text-center relative z-10">

                <p className="text-violet-400 tracking-[6px] text-sm mb-4">
                    PREMIUM ATHLETIC FASHION
                </p>

                <h1 className="text-5xl md:text-7xl font-bold text-white">
                    ELITE ATHLETICS
                </h1>

                <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
                    Premium sportswear crafted for performance,
                    comfort and luxury lifestyle.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">

                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition">
                        Shop Now
                    </button>

                    <button className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
                        Explore Collection
                    </button>

                </div>

            </div>

        </section>
    );
};

export default HeroSection;