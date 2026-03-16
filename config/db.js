const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/QuickCart")
        console.log("QuickCart database connected successfully");

    } catch (error) {
        console.log("Error while connecting to DB", error);
        process.exit(1)
    }
}

module.exports = connectDB