import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-all duration-300"
        >

            <FaSignOutAlt />

            <span>Logout</span>

        </button>
    );
};

export default LogoutButton;