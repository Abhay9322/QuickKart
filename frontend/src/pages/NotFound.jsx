// src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="relative min-h-screen bg-[#050816] flex items-center justify-center overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Violet Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-600/20 blur-[180px]" />

            {/* Content */}
            <div className="relative z-10 max-w-lg w-full mx-4">

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 text-center shadow-2xl">

                    {/* 404 */}
                    <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
                        404
                    </h1>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white mt-4">
                        Page Not Found
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 mt-4 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Button */}
                    <Link
                        to="/"
                        className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition"
                    >
                        Back To Home
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default NotFound;