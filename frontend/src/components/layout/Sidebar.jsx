import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Tractor,
    Package,
    Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const menu = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/admin",
        },
        {
            name: "Products",
            icon: <Package size={20} />,
            path: "/admin/products",
        },
        {
            name: "Orders",
            icon: <ShoppingCart size={20} />,
            path: "/admin/orders",
        },
        {
            name: "Farmers",
            icon: <Tractor size={20} />,
            path: "/admin/farmers",
        },
        {
            name: "Customers",
            icon: <Users size={20} />,
            path: "/admin/customers",
        },
        {
            name: "Settings",
            icon: <Settings size={20} />,
            path: "/admin/settings",
        },
    ];

    return (
        <aside
            className="
                w-72
                min-h-screen
                bg-white
                border-r
                border-slate-200
                shadow-lg
                hidden
                lg:block
            "
        >
            {/* Logo */}
            <div
                className="
                    bg-gradient-to-r
                    from-indigo-600
                    to-purple-600
                    p-6
                "
            >
                <h1 className="text-2xl font-bold text-white">
                    Kisan Bazar
                </h1>

                <p className="text-indigo-100 text-sm mt-1">
                    Admin Dashboard
                </p>
            </div>

            {/* Menu */}
            <div className="p-4">

                <div className="space-y-2">

                    {menu.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-xl
                                transition-all
                                duration-200
                                font-medium
                                ${isActive
                                    ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }
                            `
                            }
                        >
                            {item.icon}

                            <span>
                                {item.name}
                            </span>
                        </NavLink>
                    ))}

                </div>

            </div>
        </aside>
    );
};

export default Sidebar;