import React from "react";

const HeroSection = () => {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center px-6">

            <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-transparent to-transparent" />

            <div className="text-center relative z-10">

                <p className="text-violet-400 tracking-[6px] text-sm mb-4">
                    PREMIUM ATHLETIC FASHION
                </p>

                <h1 className="text-5xl md:text-7xl font-bold text-white">
                    ELITE ATHLETICS
                </h1>

                <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                    Premium sportswear crafted for performance,
                    comfort and luxury lifestyle.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-10">

                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition">
                        Shop Now
                    </button>

                    <button className="px-8 py-4 rounded-full border border-white/10 text-white hover:bg-white/10 transition">
                        Explore Collection
                    </button>

                </div>

            </div>

        </section>
    );
};

export default HeroSection;