const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.Token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;   // ✅ attach decoded data
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        });
    }
};

module.exports = isLoggedIn;