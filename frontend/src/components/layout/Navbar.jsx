import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="logo">
                MyApp
            </div>

            {/* Nav Links */}
            <ul className="nav-links">

                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/about">About</Link>
                </li>

                <li>
                    <Link to="/register">Sign Up</Link>
                </li>

                <li>
                    <Link to="/contact">Contact</Link>
                </li>

            </ul>

        </nav>
    );
};

export default Navbar;