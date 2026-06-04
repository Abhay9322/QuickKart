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
                        <h1 className="text-3xl font-bold text-white">
                            DigitalKisanBazar
                        </h1>

                        <p className="text-green-400 text-xs tracking-[3px] mt-2">
                            FARM FRESH • DIRECT FROM FARMERS
                        </p>

                        <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                            Bringing fresh fruits, vegetables, grains and dairy products directly from farmers to your doorstep.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Categories
                        </h3>

                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-green-400 transition cursor-pointer">
                                Fruits
                            </li>

                            <li className="hover:text-green-400 transition cursor-pointer">
                                Vegetables
                            </li>

                            <li className="hover:text-green-400 transition cursor-pointer">
                                Grains
                            </li>

                            <li className="hover:text-green-400 transition cursor-pointer">
                                Dairy
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">
                            Customer Support
                        </h3>

                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-green-400 transition cursor-pointer">
                                Contact Us
                            </li>

                            <li className="hover:text-green-400 transition cursor-pointer">
                                Shipping Policy
                            </li>

                            <li className="hover:text-green-400 transition cursor-pointer">
                                Return Policy
                            </li>

                            <li className="hover:text-green-400 transition cursor-pointer">
                                FAQ
                            </li>
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