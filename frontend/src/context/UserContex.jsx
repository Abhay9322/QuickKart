import { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const register = async (name, email, password, phone) => {
        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/v1/auth/register",
                { name, email, password, phone },
                { withCredentials: true }
            );

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

            // setUser(res.data.user);
            setUser(res.data);
            console.log("Response is", res.data);


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