import Sidebar from "../components/layout/Sidebar";

import DashboardStats from "../components/dashboard/DashboardStats";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import TopProducts from "../components/dashboard/TopProducts";

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />

            <div className="flex-1 p-4 md:p-6">

                {/* Header */}
                <div className="
                    bg-gradient-to-r
                    from-indigo-600
                    to-purple-600
                    rounded-2xl
                    shadow-lg
                    p-6
                    mb-6
                ">
                    <h1 className="text-3xl font-bold text-white">
                        Admin Dashboard
                    </h1>

                    <p className="text-indigo-100 mt-2">
                        Welcome back! Here's an overview of your business.
                    </p>
                </div>

                {/* Stats */}
                <DashboardStats />

                {/* Charts & Products */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">

                    <RevenueChart />

                    <TopProducts />

                </div>

                {/* Recent Orders */}
                <div className="mt-6">
                    <RecentOrders />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;