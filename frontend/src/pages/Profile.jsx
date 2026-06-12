import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { FaShoppingBag, FaTruck, FaCheckCircle } from "react-icons/fa";

import ProfileHeader from "../components/profile/ProfileHeader";
import StatsCard from "../components/profile/StatsCard";
import OrderCard from "../components/profile/OrderCard";
import AddressCard from "../components/profile/AddressCard";
import LogoutButton from "../components/profile/LogoutButton";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { UserContext } from "../context/UserContex";

const Profile = () => {
    const { user } = useContext(UserContext);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const userId = user?._id;

    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/api/v1/auth/logout", {}, {
                withCredentials: true,
            });
            // alert("Logout successfully");
            toast.success("User Logged out successfully");

            navigate("/auth")
        } catch (error) {
            console.log("Logout error:", error);
        }
    };


    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/users/profile/${userId}`,
                    { withCredentials: true }
                );

                setProfile(response.data.data);
            } catch (error) {
                console.log("Profile error:", error);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050816] flex items-center justify-center text-white text-lg">
                Loading profile...
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen bg-[#050816] flex items-center justify-center text-red-500 text-center px-4">
                Failed to load profile
            </div>
        );
    }

    const orders = profile.orders || [];

    const address = orders?.[0]?.shippingAddress || {};

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.orderStatus?.toLowerCase() === "pending"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.orderStatus?.toLowerCase() === "delivered"
    ).length;

    return (
        <div className="relative min-h-screen bg-[#050816] text-white overflow-hidden px-4 py-5 sm:px-6 lg:px-8">

            <div className="relative z-10 max-w-7xl mx-auto space-y-6 md:space-y-8">

                {/* Profile Header */}
                <ProfileHeader user={profile} />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">

                    <StatsCard
                        title="Total Orders"
                        value={totalOrders}
                        icon={FaShoppingBag}
                    />

                    <StatsCard
                        title="Pending Orders"
                        value={pendingOrders}
                        icon={FaTruck}
                    />

                    <StatsCard
                        title="Delivered"
                        value={deliveredOrders}
                        icon={FaCheckCircle}
                    />

                </div>

                {/* Orders Section */}
                <div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                        My Orders
                    </h2>

                    {orders.length === 0 ? (
                        <div className="bg-[#0b1020] border border-white/10 rounded-xl p-6 text-center text-gray-400">
                            No orders found
                        </div>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            {orders.map((order) => (
                                <OrderCard
                                    key={order._id}
                                    order={order}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Address Section */}
                <AddressCard address={address} />

                {/* Logout Button */}
                <div className="flex justify-center sm:justify-end">
                    <LogoutButton logout={logout} />
                </div>

            </div>
        </div>
    );
};

export default Profile;