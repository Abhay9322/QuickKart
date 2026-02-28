const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route.js");
const adminRoute = require("./routes/admin.routes.js");
const categoryRoute = require("./routes/category.routes.js");
const userRoute = require("./routes/user.routes.js");
const productRoute = require("./routes/product.route.js");
const cartRoute = require("./routes/cart.route.js")
const orderRoute = require("./routes/order.route.js")
const connectDB = require("./config/db.js");



const app = express();
app.use(cookieParser())
app.use(express.json());

connectDB()

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/category", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
