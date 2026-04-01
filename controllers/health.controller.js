const mongoose = require("mongoose");
const ApiError = require("../utils/api-error");
const ApiResponse = require("../utils/api-response");
const asyncHandler = require("../utils/async-handler");

const healthCheck = async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            message: "Server is running",
            data: {
                database: dbStatus,
                uptime: process.uptime()
            }
        }));
    } catch (error) {
        return res.status(500).json(new ApiResponse({
            statusCode: 500,
            message: "Healthcheck failed",
            data: {
                error: error.message
            }
        }));
    }
}

module.exports = { healthCheck }