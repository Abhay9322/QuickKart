const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model");


const register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Required fields are missing" })
        }
        const existingUser = await User.findOne({
            email
        })

        if (existingUser) {
            return res.status(409).json({ message: "User already registred" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        })

        return res.send({ message: "User registred successfully" })

    } catch (error) {
        console.log("Error is:", error);

        return res.status(500).json({ message: "Internal server error" })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Required fields are missing" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })


        return res.status(200).json({
            message: "User logged in successfully", token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.log("Error occured while logging", error);
        return res.status(500).json({ message: "Internal server while login" })

    }
};

module.exports = { register, login };
