// src/layout/Layout.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
    return (


        <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[180px]" />

            <Header />

            <main className="relative z-10">
                {children}
            </main>

            <Footer />

        </div>
    );
};

export default Layout;