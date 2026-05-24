import { useState } from "react"
import "./register.css"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService" // API call

const Register = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
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

        if (!form.name || !form.email || !form.password) {
            return setError("All fields are required")
        }

        try {
            setLoading(true)

            const res = await registerUser(form)

            if (res.status === 201 || res.status === 200) {
                alert("Account created ✅")
                navigate("/login")
            }

        } catch (err) {
            setError(err.response?.data?.message || "Signup failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-container">

            <div className="register-box">

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={form.name}
                        onChange={handleChange}
                    />

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

                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    {error && <p className="error-text">{error}</p>}

                    <button className="register-btn">
                        {loading ? "Creating..." : "Register"}
                    </button>

                </form>

                <p className="login-link">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>

            </div>

        </div>
    )
}

export default Register