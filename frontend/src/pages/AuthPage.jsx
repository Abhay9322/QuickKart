import { input } from "framer-motion/client";
import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(null)

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/v1/auth/register",
                {
                    name,
                    email,
                    password,
                    phone
                }, { withCredentials: true })
            console.log("Register response is :", response.data);
            alert("Registered Successfully")
            setIsLogin(true)


        } catch (error) {

            console.log(error.response?.data);

            error.response?.data?.errors?.forEach((err) => {
                console.log(err);
            });
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            console.log({
                email,
                password
            });
            const response = await axios.post("http://localhost:5000/api/v1/auth/login",
                {
                    email,
                    password
                }, { withCredentials: true })
            console.log("Login response is :", response.data);
            alert("Login Successfully")
            navigate("/")


        } catch (error) {

            console.log(error.response?.data);

            error.response?.data?.errors?.forEach((err) => {
                console.log(err);
            });


        }
    }

    return (
        <div className="relative min-h-screen bg-[#050816] flex items-center justify-center p-4 overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[150px]" />

            <div className="relative w-full max-w-md">

                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">

                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-bold text-white tracking-wider">
                            NEXORA
                        </h1>

                        <p className="text-violet-400 text-sm mt-2 tracking-[4px]">
                            PREMIUM • STYLE • YOU
                        </p>

                    </div>


                    <div className="flex justify-center gap-8 mb-8">

                        <button
                            onClick={() => setIsLogin(true)}
                            className={`pb-2 font-medium transition-all duration-300 ${isLogin
                                ? "text-white border-b-2 border-violet-500"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setIsLogin(false)}
                            className={`pb-2 font-medium transition-all duration-300 ${!isLogin
                                ? "text-white border-b-2 border-violet-500"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            Sign Up
                        </button>

                    </div>

                    <form className="space-y-4" onSubmit={isLogin ? handleLogin : handleRegister}>

                        {!isLogin && (
                            <InputField
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                        )}
                        {!isLogin && (
                            <InputField
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                        )}

                        <InputField
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <InputField
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />


                        {isLogin && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-sm text-violet-400 hover:text-violet-300"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="
                                w-full
                                h-14
                                rounded-2xl
                                bg-gradient-to-r
                                from-violet-600
                                to-fuchsia-600
                                text-white
                                font-semibold
                                hover:scale-[1.02]
                                transition-all
                                duration-300
                            "
                        >
                            {isLogin
                                ? "Login"
                                : "Create Account"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

/* Reusable Input Component */
function InputField({ type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="
                w-full
                h-14
                px-5
                rounded-2xl
                bg-white/5
                border
                border-white/10
                text-white
                placeholder:text-gray-400
                outline-none
                focus:border-violet-500
                focus:bg-white/10
                transition-all
                duration-300
            "
        />
    );
}