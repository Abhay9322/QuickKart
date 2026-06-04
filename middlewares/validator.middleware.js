const { validationResult } = require("express-validator");
const ApiError = require("../utils/api-error");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const extractedError = [];
    errors.array().map(err => extractedError.push({ [err.path]: err.msg }));

    throw new ApiError({
        statusCode: 422,
        message: "Received data is not valid",
        errors: extractedError
    });
};

module.exports = validate;




