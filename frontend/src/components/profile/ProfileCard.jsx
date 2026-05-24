import React from "react"

const ProfileCard = ({ user }) => {

    if (!user) return <p>Loading...</p>

    return (
        <div style={styles.container}>

            {/* Profile Image */}
            <img
                src={user.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                style={styles.image}
            />

            {/* User Info */}
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone || "No phone added"}</p>

            {/* Role */}
            <span style={styles.role}>
                {user.role}
            </span>

            {/* Address */}
            <div style={styles.addressBox}>
                <h4>Address</h4>

                {user.address?.length === 0 ? (
                    <p>No address added</p>
                ) : (
                    user.address?.map((addr, index) => (
                        <div key={index} style={styles.address}>
                            <p>{addr.address}</p>
                            <p>{addr.city}, {addr.state}</p>
                            <p>{addr.pincode}, {addr.country}</p>

                            {addr.isDefault && (
                                <span style={styles.defaultTag}>
                                    Default
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}

const styles = {
    container: {
        width: "350px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        background: "#fff"
    },
    image: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px"
    },
    role: {
        display: "inline-block",
        padding: "5px 10px",
        background: "#007bff",
        color: "#fff",
        borderRadius: "20px",
        fontSize: "12px",
        marginTop: "5px"
    },
    addressBox: {
        marginTop: "20px",
        textAlign: "left"
    },
    address: {
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px"
    },
    defaultTag: {
        color: "green",
        fontWeight: "bold",
        fontSize: "12px"
    }
}

export default ProfileCard