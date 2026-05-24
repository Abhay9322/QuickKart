import React, { useState, useEffect } from 'react'
import { getProfile } from '../services/authService'
import ProfileCard from '../components/profile/ProfileCard'
import { useParams } from 'react-router-dom'

const Profile = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { id } = useParams()   // ✅ FIXED

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                setLoading(true)

                const res = await getProfile(id)
                setUser(res.data.user)

            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message || "Error fetching profile")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProfile()
        }

    }, [id])   // ✅ FIXED

    if (loading) return <p>Loading...</p>

    return (
        <div>
            {error && <p>{error}</p>}

            <ProfileCard user={user} />
        </div>
    )
}

export default Profile