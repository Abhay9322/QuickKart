import { useState } from "react"
import "./register.css"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"

const Login = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.email || !form.password) {
            return setError("All fields are required")
        }

        try {
            setLoading(true)

            const res = await loginUser(form)

            if (res.status === 200) {
                alert("Login successful ✅")

                // 🔐 save token
                localStorage.setItem("token", res.data.token)

                // redirect
                navigate("/")
            }

        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-container">

            <div className="register-box">

                <h2>Login</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {error && <p className="error-text">{error}</p>}

                    <button className="register-btn">
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="login-link">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/register")}>
                        Signup
                    </span>
                </p>

            </div>

        </div>
    )
}

export default Login