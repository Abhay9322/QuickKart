import React from "react";

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">

            {/* Violet Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/10 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 py-14">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Brand */}
                    <div>
                        <h1 className="text-3xl font-bold tracking-[8px] text-white">
                            ELITE
                        </h1>

                        <p className="text-violet-400 text-xs tracking-[4px] mt-2">
                            PREMIUM • STYLE • YOU
                        </p>

                        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                            Luxury athletic fashion designed for those who
                            demand performance and elegance.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Shop
                        </h3>

                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-violet-400 transition cursor-pointer">
                                New Arrivals
                            </li>

                            <li className="hover:text-violet-400 transition cursor-pointer">
                                Collections
                            </li>

                            <li className="hover:text-violet-400 transition cursor-pointer">
                                Archive
                            </li>

                            <li className="hover:text-violet-400 transition cursor-pointer">
                                Best Sellers
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Support
                        </h3>

                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-violet-400 transition cursor-pointer">
                                Shipping
                            </li>

                            <li className="hover:text-violet-400 transition cursor-pointer">
                                Returns
                            </li>

                            <li className="hover:text-violet-400 transition cursor-pointer">
                                Contact
                            </li>

                            <li className="hover:text-violet-400 transition cursor-pointer">
                                FAQ
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-white/10 text-center">

                    <p className="text-gray-500 text-sm">
                        © 2026 ELITE. All rights reserved.
                    </p>

                </div>

            </div>
        </footer>
    );
};

export default Footer;