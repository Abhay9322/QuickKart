import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("stored", storedUser);

        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.log("Invalid user in localStorage");
                localStorage.removeItem("user");
            }
        }
    }, []);

    const register = async (name, email, password, phone) => {
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/register",
                { name, email, password, phone },
                { withCredentials: true }
            );

            toast.success("User Registered successfully");
            return res.data;
        } catch (error) {
            console.log(error.response?.data || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/login",
                { email, password },
                { withCredentials: true }
            );

            const loggedUser = res.data.data; // ✅ FIX

            setUser(loggedUser);

            localStorage.setItem("user", JSON.stringify(loggedUser)); // ✅ IMPORTANT
            toast.success("User Logged in successful");

            console.log("User:", loggedUser);

            return res.data;
        } catch (error) {
            console.log(error.response?.data || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, register, login }}>
            {children}
        </UserContext.Provider>
    );
};