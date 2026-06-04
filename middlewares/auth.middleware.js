const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const isLoggedIn = async (req, res, next) => {
    console.log("Inside isLoggedIn middleware");

    const token = req.cookies.token;
    console.log("Token is:", token);


    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        console.log("Decoded data is:", decoded);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(403).json({
                message: "User not found"
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                message: "Account blocked"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        });
    }
};

module.exports = isLoggedIn;