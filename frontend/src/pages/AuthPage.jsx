import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContex";

export default function AuthPage() {

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate()

    const { register, login, user } = useContext(UserContext)

    const handleRegister = async (e) => {
        e.preventDefault();
        register(name, email, password, phone)
        setIsLogin(true)
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        login(email, password)
        navigate("/")
    };

    return (
        <div className="relative min-h-screen bg-[#050816] flex items-center justify-center px-4 overflow-hidden text-white">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-600/20 blur-[150px]" />

            {/* Card */}
            <div className="relative w-full max-w-md">

                <div className="bg-[#0b1020] border border-white/10 rounded-2xl p-8 shadow-xl">

                    {/* HEADER */}
                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold">
                            KisanBazar
                        </h1>

                        <p className="text-green-400 text-sm mt-2 tracking-wide">
                            Direct • Fresh • From Farmers
                        </p>

                    </div>

                    {/* TAB BUTTONS */}
                    <div className="flex justify-center gap-6 mb-8">

                        <button
                            onClick={() => setIsLogin(true)}
                            className={`pb-2 transition ${isLogin
                                ? "border-b-2 border-green-500 text-white"
                                : "text-gray-400"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`pb-2 transition ${!isLogin
                                ? "border-b-2 border-green-500 text-white"
                                : "text-gray-400"
                                }`}
                        >
                            Sign Up
                        </button>

                    </div>

                    {/* FORM */}
                    <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">

                        {!isLogin && (
                            <InputField
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}

                        {!isLogin && (
                            <InputField
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        )}

                        <InputField
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputField
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {isLogin && (
                            <div className="text-right">
                                <button type="button" className="text-sm text-green-400">
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 transition font-semibold"
                        >
                            {isLogin ? "Login" : "Create Account"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

/* INPUT */
function InputField({ placeholder, value, onChange, type = "text" }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-green-500"
        />
    );
}