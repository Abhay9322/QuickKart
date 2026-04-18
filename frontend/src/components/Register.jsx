import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/v1/auth/register", {
                name,
                email,
                password,
                phone
            })
            if (response.status === 200 || response.status === 201) {
                alert("Registration Successful")
            }
            navigate("/login")
        } catch (error) {
            console.log("Error is:", error.message)
            setError(error.message)
        }
    }
    return (
        < div >
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <button type="submit">Register</button>
            </form>
            {error && <p>Error is: {error}</p>}
        </div >
    )
}

export default Register
