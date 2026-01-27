const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.route");
const connectDB = require("./config/db")

dotenv.config();

const app = express();
app.use(express.json());

connectDB()

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
