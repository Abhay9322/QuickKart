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
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
        { name: "Products", icon: <Package size={20} />, path: "/admin/products" },
        { name: "Orders", icon: <ShoppingCart size={20} />, path: "/admin/orders" },
        { name: "Farmers", icon: <Tractor size={20} />, path: "/admin/farmers" },
        { name: "Customers", icon: <Users size={20} />, path: "/admin/customers" },
        { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
    ];

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200">

            {/* Logo */}
            <div className="p-5 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-emerald-600">
                    Kisan Bazar
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                    Admin Panel
                </p>
            </div>

            {/* Menu */}
            <div className="p-4 space-y-2">

                {menu.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition font-medium ${isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`
                        }
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.name}</span>
                    </NavLink>
                ))}

            </div>

        </aside>
    );
};

export default Sidebar;