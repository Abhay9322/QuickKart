class ApiResponse {
    constructor({ statusCode, message = "Success", data = null }) {
        this.success = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.error = null
    }

    send(res) {
        return res.status(this.statusCode).json(this);
    }
}

module.exports = ApiResponse;