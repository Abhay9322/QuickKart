import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="relative bg-[#050816]/80 backdrop-blur-xl border-b border-white/10">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    <div className="flex items-center gap-3">
                        <h1 className="text-white font-bold text-xl tracking-wide">
                            KisanBazar
                        </h1>
                    </div>

                    <div className="hidden sm:flex gap-6 text-sm">
                        <Link className="text-white hover:text-green-400" to="/">
                            Home
                        </Link>

                        <Link className="text-gray-300 hover:text-green-400" to="/shop">
                            Shop
                        </Link>

                        <Link className="text-gray-300 hover:text-green-400" to="/cart">
                            Cart
                        </Link>

                        <Link className="text-gray-300 hover:text-green-400" to="/about">
                            About
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* 
                        <button className="text-gray-400 hover:text-white cursor-pointer">
                            <FaBell size={20} />
                        </button> */}
                        <Link className="text-gray-300 hover:text-green-400" to="/auth">
                            SignUp
                        </Link>

                        <Link to="/profile">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="profile"
                                className="w-10 h-10 rounded-full border border-white/10 cursor-pointer"
                            />
                        </Link>

                        <button
                            className="sm:hidden text-white cursor-pointer"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <FaTimes /> : <FaBars />}
                        </button>

                    </div>

                </div>
            </div>

            {mobileOpen && (
                <div className="sm:hidden px-4 pb-4 space-y-3 bg-[#050816] border-t border-white/10">

                    <Link className="block text-white" to="/">Dashboard</Link>
                    <Link className="block text-gray-300" to="/shop">Shop</Link>
                    <Link className="block text-gray-300" to="/cart">Cart</Link>
                    <Link className="block text-gray-300" to="/about">About</Link>

                </div>
            )}

        </nav>
    );
};

export default Header;