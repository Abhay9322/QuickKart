import React from 'react'
import { useState } from 'react'
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
                email,
                password,
            })
            if (response.status === 200 || response.status === 201) {
                alert("Login Successful")
            }
        } catch (error) {
            console.log("Error is:", error.message)
            setError(error.message)
        }
    }
    return (
        < div >
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>Error is: {error}</p>}
        </div >
    )
}

export default Login
