import { FaShoppingBag, FaTruck, FaCheckCircle } from "react-icons/fa";

import ProfileHeader from "../components/profile/ProfileHeader";
import StatsCard from "../components/profile/StatsCard";
import OrderCard from "../components/profile/OrderCard";
import AddressCard from "../components/profile/AddressCard";
import LogoutButton from "../components/profile/LogoutButton";

import { useContext } from "react";
// import { UserContext } from "../context/UserContext";
import { UserContext } from "../context/UserContex";

const Profile = () => {

    const { user } = useContext(UserContext);

    if (!user) {
        return (
            <div className="min-h-screen bg-[#050816] flex items-center justify-center text-red-500">
                Failed to load profile
            </div>
        );
    }

    const orders = user.orders || [];

    const address = user.address || {
        name: user.name,
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    };

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length;

    return (
        <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden p-5">

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">

                <ProfileHeader user={user} />

                <div className="grid md:grid-cols-3 gap-5">

                    <StatsCard title="Total Orders" value={totalOrders} icon={FaShoppingBag} />

                    <StatsCard title="Pending Orders" value={pendingOrders} icon={FaTruck} />

                    <StatsCard title="Delivered" value={deliveredOrders} icon={FaCheckCircle} />

                </div>

                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        My Orders
                    </h2>

                    {orders.length === 0 ? (
                        <div className="bg-[#0b1020] border border-white/10 rounded-xl p-6 text-center text-gray-400">
                            No orders found
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <OrderCard key={order._id} order={order} />
                            ))}
                        </div>
                    )}
                </div>

                <AddressCard address={address} />

                <div className="flex justify-end">
                    <LogoutButton />
                </div>

            </div>
        </div>
    );
};

export default Profile;