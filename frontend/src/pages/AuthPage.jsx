import { useState } from "react";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="relative min-h-screen bg-[#050816] flex items-center justify-center p-4 overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

            {/* Violet Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[150px]" />

            {/* Auth Container */}
            <div className="relative w-full max-w-md">

                {/* Main Card */}
                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">

                    {/* Logo */}
                    <div className="text-center mb-8">

                        <h1 className="text-4xl font-bold text-white tracking-wider">
                            NEXORA
                        </h1>

                        <p className="text-violet-400 text-sm mt-2 tracking-[4px]">
                            PREMIUM • STYLE • YOU
                        </p>

                    </div>

                    {/* Tabs */}
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

                    {/* Form */}
                    <form className="space-y-4">

                        {!isLogin && (
                            <InputField
                                type="text"
                                placeholder="Full Name"
                            />
                        )}

                        <InputField
                            type="email"
                            placeholder="Email Address"
                        />

                        <InputField
                            type="password"
                            placeholder="Password"
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
function InputField({ type, placeholder }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
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