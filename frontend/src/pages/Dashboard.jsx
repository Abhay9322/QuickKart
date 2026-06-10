import Sidebar from "../components/layout/Sidebar";
// import Navbar from "../components/layout/Navbar";

import DashboardStats from "../components/dashboard/DashboardStats";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentOrders from "../components/dashboard/RecentOrders";
import TopProducts from "../components/dashboard/TopProducts";

const Dashboard = () => {
    return (
        <div className="flex bg-gray-100">
            <Sidebar />

            <div className="flex-1">
                {/* <Navbar /> */}

                <div className="p-6 space-y-6">
                    <DashboardStats />

                    <div className="grid lg:grid-cols-2 gap-6">
                        <RevenueChart />
                        <TopProducts />
                    </div>

                    <RecentOrders />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;