import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Tractor,
    Package,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    const menu = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            name: "Products",
            icon: <Package size={20} />,
        },
        {
            name: "Orders",
            icon: <ShoppingCart size={20} />,
        },
        {
            name: "Farmers",
            icon: <Tractor size={20} />,
        },
        {
            name: "Customers",
            icon: <Users size={20} />,
        },
        {
            name: "Settings",
            icon: <Settings size={20} />,
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-green-900 text-white">
            <div className="p-5 border-b border-green-700">
                <h1 className="text-2xl font-bold">
                    Kisan Bazar
                </h1>
            </div>

            <div className="p-4 space-y-2">
                {menu.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-green-800"
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default Sidebar;