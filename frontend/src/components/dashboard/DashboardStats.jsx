import {
    IndianRupee,
    Users,
    Package,
    Tractor,
} from "lucide-react";

import StatsCard from "./StatsCard";

const DashboardStats = () => {
    return (
        <div className="grid md:grid-cols-4 gap-5">

            <StatsCard
                title="Revenue"
                value="₹5,40,000"
                icon={<IndianRupee size={28} />}
            />

            <StatsCard
                title="Orders"
                value="1,250"
                icon={<Package size={28} />}
            />

            <StatsCard
                title="Customers"
                value="820"
                icon={<Users size={28} />}
            />

            <StatsCard
                title="Farmers"
                value="120"
                icon={<Tractor size={28} />}
            />

        </div>
    );
};

export default DashboardStats;