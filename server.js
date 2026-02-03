const express = require("express");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.route.js");
const productRoute = require("./routes/product.route.js");
const cartRoute = require("./routes/cart.route.js")
const connectDB = require("./config/db.js")

dotenv.config();

const app = express();
app.use(express.json());

connectDB()

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute)
app.use("/api/cart", cartRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
