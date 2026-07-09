import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">

                <Navbar />

                <main
                    className="
                        flex-1
                        p-4
                        md:p-6
                        overflow-y-auto
                    "
                >
                    {children}
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;