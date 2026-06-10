import React from "react";

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-white/10 bg-[#050816] text-white overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[160px]" />

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 py-16">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

                        <h1 className="text-3xl font-bold">
                            DigitalKisanBazar
                        </h1>

                        <p className="text-green-400 text-xs tracking-[4px] mt-2">
                            FARM FRESH • DIRECT FROM FARMERS
                        </p>

                        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                            Bringing fresh fruits, vegetables, grains and dairy products directly from farmers to your doorstep.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

                        <h3 className="text-white font-semibold mb-4">
                            Categories
                        </h3>

                        <ul className="space-y-3 text-gray-400 text-sm">
                            {["Fruits", "Vegetables", "Grains", "Dairy"].map((item) => (
                                <li
                                    key={item}
                                    className="hover:text-violet-400 transition cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

                        <h3 className="text-white font-semibold mb-4">
                            Customer Support
                        </h3>

                        <ul className="space-y-3 text-gray-400 text-sm">
                            {["Contact Us", "Shipping Policy", "Return Policy", "FAQ"].map((item) => (
                                <li
                                    key={item}
                                    className="hover:text-violet-400 transition cursor-pointer"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-white/10 text-center">

                    <p className="text-gray-500 text-sm">
                        © 2026 DigitalKisanBazar. All rights reserved.
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;