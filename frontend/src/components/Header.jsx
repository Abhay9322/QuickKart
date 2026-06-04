import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                {/* Left Navigation */}
                <nav className="hidden md:flex gap-8 text-sm font-medium">

                    <Link
                        to="/"
                        className="text-gray-300 hover:text-violet-400 transition"

                    >
                        Home
                    </Link>
                    <Link
                        to="/shop"
                        className="text-gray-300 hover:text-violet-400 transition"
                    >
                        Shop
                    </Link>

                </nav>

                {/* Logo */}
                <div className="text-center">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-[2px] text-white">
                        KisanBazar
                    </h1>

                    <p className="text-[10px] tracking-[4px] text-violet-400">
                        FARM FRESH • DIRECT FROM FARMERS
                    </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 text-sm">
                    <Link
                        to="/search"
                        className="text-gray-300 hover:text-violet-400 transition"
                    >
                        Search
                    </Link>

                    <Link
                        to="/cart"
                        className="text-gray-300 hover:text-violet-400 transition"
                    >
                        Cart
                    </Link>
                    <Link
                        to="/auth"
                        className="text-gray-300 hover:text-violet-400 transition"
                    >
                        SignUp
                    </Link>

                </div>

            </div>
        </header>
    );
};

export default Header;