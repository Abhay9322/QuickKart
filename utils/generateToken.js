const jwt = require("jsonwebtoken");

// Access Token (15 min)
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
    );
};

// Refresh Token (7 days)
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = { generateAccessToken, generateRefreshToken }