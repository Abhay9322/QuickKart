import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="relative min-h-screen bg-[#050816] flex items-center justify-center overflow-hidden text-white">

            {/* Background Pattern (same system) */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Green Glow (theme match) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-600/20 blur-[180px]" />

            {/* CONTENT */}
            <div className="relative z-10 max-w-lg w-full mx-4">

                <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-10 text-center shadow-xl">

                    {/* 404 */}
                    <h1 className="text-7xl sm:text-8xl font-bold text-green-400">
                        404
                    </h1>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-bold mt-4">
                        Page Not Found
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 mt-4">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* BUTTON */}
                    <Link
                        to="/"
                        className="inline-block mt-8 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 transition font-semibold"
                    >
                        Back To Home
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default NotFound;