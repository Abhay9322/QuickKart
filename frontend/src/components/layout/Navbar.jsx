import { Bell, Search } from "lucide-react";

const Navbar = () => {
    return (
        <div className="bg-white p-4 shadow flex justify-between items-center">
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-96">
                <Search size={18} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none ml-2 w-full"
                />
            </div>

            <div className="flex items-center gap-5">
                <Bell />

                <img
                    src="https://i.pravatar.cc/150"
                    alt=""
                    className="w-10 h-10 rounded-full"
                />
            </div>
        </div>
    );
};

export default Navbar;