import React from "react";

const About = () => {
    return (
        <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden">

            {/* Background Pattern (same as Cart) */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-600/20 blur-[150px]" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 min-h-screen flex items-center">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                    {/* TEXT SECTION */}
                    <div>

                        <h2 className="text-green-400 font-semibold tracking-wide">
                            KisanBazar – Direct From Farmers
                        </h2>

                        <h1 className="mt-3 text-3xl sm:text-5xl font-bold leading-tight">
                            Fresh Produce, Directly from Farms to Your Home
                        </h1>

                        <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
                            KisanBazar connects farmers directly with customers.
                            We eliminate middlemen so you get fresh, organic, and affordable
                            agricultural products while farmers earn better income.
                        </p>

                        {/* FEATURES */}
                        <div className="mt-10 space-y-6">

                            <div className="flex gap-4">
                                <span className="text-2xl">🚜</span>
                                <div>
                                    <h3 className="font-semibold">Direct from Farmers</h3>
                                    <p className="text-gray-400 text-sm">
                                        No middlemen, only fresh farm products.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <span className="text-2xl">🌱</span>
                                <div>
                                    <h3 className="font-semibold">Organic & Fresh</h3>
                                    <p className="text-gray-400 text-sm">
                                        Naturally grown and chemical-free food.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <span className="text-2xl">💰</span>
                                <div>
                                    <h3 className="font-semibold">Fair Pricing</h3>
                                    <p className="text-gray-400 text-sm">
                                        Better profit for farmers, better price for customers.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* IMAGE SECTION */}
                    <div className="flex justify-center">
                        <img
                            src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?w=900"
                            alt="Farm"
                            className="w-full max-w-[500px] h-[420px] object-cover rounded-2xl shadow-xl ring-1 ring-white/10"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
};

export default About;