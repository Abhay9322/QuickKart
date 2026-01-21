const register = async (req, res) => {
    console.log("This is register function");
    res.json({ message: "Register route working" });
};

const login = async (req, res) => {
    console.log("This is login function");
    res.json({ message: "Login route working" });
};

module.exports = { register, login };
