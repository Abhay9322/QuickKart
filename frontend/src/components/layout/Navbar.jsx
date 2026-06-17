import { Bell, Search } from "lucide-react";

const Navbar = () => {
    return (
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">

            {/* Search */}
            <div className="flex items-center bg-slate-100 px-3 py-2 rounded-lg w-full max-w-md">

                <Search size={18} className="text-slate-500" />

                <input
                    type="text"
                    placeholder="Search products, orders..."
                    className="bg-transparent outline-none ml-2 w-full text-slate-700 placeholder:text-slate-400"
                />

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">

                {/* Notification */}
                <div className="relative cursor-pointer">
                    <Bell className="text-slate-600 hover:text-emerald-600 transition" />
                    <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-2">
                    <img
                        src="https://i.pravatar.cc/150"
                        alt="profile"
                        className="w-9 h-9 rounded-full border border-slate-200"
                    />

                    <div className="text-sm">
                        <p className="font-medium text-slate-800">Admin</p>
                        <p className="text-xs text-slate-500">Super Admin</p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Navbar;