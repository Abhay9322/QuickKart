const { body } = require("express-validator");

const userRegisterationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is requird")
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("username is required")
            .isLength({ min: 3 }).withMessage("username should be at least 3 char")
            .isLength({ max: 3 }).withMessage("username cannot exceed 13 char")

    ]
};

const userLoginValidator = () => {
    return [body("email").isEmail().withMessage("Email is not valid")]
};

export { userRegisterationValidator, userLoginValidator }
