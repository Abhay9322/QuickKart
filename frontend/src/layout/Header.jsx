import { Menu, ShoppingBag } from "lucide-react";

const Header = ({ setSidebarOpen }) => {
    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50
    w-[90%] max-w-7xl h-16
    rounded-full bg-zinc-900/70 backdrop-blur-xl
    border border-white/10
    flex items-center justify-between px-8">

            <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)}>
                    <Menu />
                </button>

                <h1 className="text-2xl font-bold">
                    ELITE
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <ShoppingBag />

                <div className="w-8 h-8 rounded-full bg-purple-500
        flex items-center justify-center text-xs font-bold">
                    AD
                </div>
            </div>
        </header>
    );
};

export default Header;