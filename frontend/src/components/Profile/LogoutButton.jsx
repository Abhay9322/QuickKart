import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = () => {
    return (
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition">

            <FaSignOutAlt />

            Logout

        </button>
    );
};

export default LogoutButton;