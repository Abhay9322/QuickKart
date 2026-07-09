import { Bell, Search } from "lucide-react";

const Navbar = () => {
    return (
        <header
            className="
                bg-white
                border-b
                border-slate-200
                px-4
                md:px-6
                py-4
                flex
                items-center
                justify-between
                gap-4
                sticky
                top-0
                z-40
            "
        >
            {/* Search */}
            <div
                className="
                    hidden
                    md:flex
                    items-center
                    bg-slate-100
                    border
                    border-slate-200
                    rounded-xl
                    px-4
                    py-3
                    w-full
                    max-w-md
                "
            >
                <Search
                    size={18}
                    className="text-slate-500"
                />

                <input
                    type="text"
                    placeholder="Search..."
                    className="
                        bg-transparent
                        outline-none
                        ml-3
                        w-full
                        text-slate-700
                        placeholder:text-slate-400
                    "
                />
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5 ml-auto">

                <button
                    className="
                        relative
                        p-2
                        rounded-xl
                        hover:bg-slate-100
                        transition
                    "
                >
                    <Bell
                        size={22}
                        className="text-slate-600"
                    />

                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            w-2
                            h-2
                            bg-red-500
                            rounded-full
                        "
                    />
                </button>

                <div className="flex items-center gap-3">

                    <img
                        src="https://i.pravatar.cc/150"
                        alt="profile"
                        className="
                            w-10
                            h-10
                            rounded-full
                            border-2
                            border-indigo-200
                        "
                    />

                    <div className="hidden sm:block">
                        <p className="font-semibold text-slate-800">
                            Admin
                        </p>

                        <p className="text-xs text-slate-500">
                            Super Admin
                        </p>
                    </div>

                </div>

            </div>
        </header>
    );
};

export default Navbar;