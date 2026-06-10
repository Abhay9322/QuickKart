import {
    Sparkles,
    Flame,
    Leaf,
    BookOpen,
    User,
    X
} from "lucide-react";

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen
}) => {
    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50
        w-80 h-screen bg-zinc-900
        transition-transform duration-300
        ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                <div className="p-8">
                    <div className="flex justify-between mb-10">
                        <h2 className="text-3xl font-bold">
                            NAVIGATION
                        </h2>

                        <button
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        >
                            <X />
                        </button>
                    </div>

                    <nav className="space-y-4">
                        <a className="flex gap-3"> <Sparkles /> Collections </a>
                        <a className="flex gap-3"> <Flame /> New Arrivals </a>
                        <a className="flex gap-3"> <Leaf /> Sustainability </a>
                        <a className="flex gap-3"> <BookOpen /> Journal </a>
                        <a className="flex gap-3"> <User /> Account </a>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;