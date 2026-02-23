const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
    console.log("Inside isLoggedIn middleware");

    const token = req.cookies.Token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded data is:", decoded);


        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        });
    }
};

module.exports = isLoggedIn;