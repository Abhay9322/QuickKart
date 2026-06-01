import React from "react";

import {
    FaShoppingBag,
    FaTruck,
    FaCheckCircle,
} from "react-icons/fa";

import ProfileHeader from "../components/profile/ProfileHeader";
import StatsCard from "../components/profile/StatsCard";
import OrderCard from "../components/profile/OrderCard";
import AddressCard from "../components/profile/AddressCard";
import LogoutButton from "../components/profile/LogoutButton";

const Profile = () => {

    const user = {
        name: "John Doe",
        email: "john@gmail.com",
        image: "https://i.pravatar.cc/150?img=12",
    };

    const address = {
        name: "John Doe",
        phone: "+91 9876543210",
        street: "221B Baker Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
    };

    const orders = [
        {
            id: "#12345",
            name: "Nike Air Max",
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
            price: 120,
            status: "Delivered",
            date: "20 May 2026",
        },
        {
            id: "#12346",
            name: "Smart Watch",
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            price: 250,
            status: "Pending",
            date: "28 May 2026",
        },
    ];

    return (
        <div className="relative min-h-screen bg-[#050816] overflow-hidden p-5">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Violet Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 blur-[180px]" />

            <div className="relative z-10 max-w-7xl mx-auto space-y-6">

                <ProfileHeader user={user} />

                <div className="grid md:grid-cols-3 gap-5">

                    <StatsCard
                        title="Total Orders"
                        value="25"
                        icon={FaShoppingBag}
                    />

                    <StatsCard
                        title="Pending Orders"
                        value="5"
                        icon={FaTruck}
                    />

                    <StatsCard
                        title="Delivered"
                        value="20"
                        icon={FaCheckCircle}
                    />

                </div>

                <div>

                    <h2 className="text-3xl font-bold text-white mb-4">
                        My Orders
                    </h2>

                    <div className="space-y-4">
                        {orders.map((order) => (
                            <OrderCard
                                key={order.id}
                                order={order}
                            />
                        ))}
                    </div>

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