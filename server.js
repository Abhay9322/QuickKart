const express = require("express");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
const adminRoute = require("./routes/admin.routes");
const categoryRoute = require("./routes/category.routes");
const userRoute = require("./routes/user.routes");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");

const connectDB = require("./db/db");

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/categories", categoryRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});