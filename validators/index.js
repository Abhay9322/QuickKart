const { body, param, query } = require("express-validator");

// --------- User Validators ---------
const userRegistrationValidator = () => [
    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 5, max: 13 }).withMessage("Name should be 5-13 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email should not be empty")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password should not be empty")
        .isLength({ min: 6, max: 10 }).withMessage("Password should be 6-10 characters")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),

    body("phone")
        .trim()
        .notEmpty().withMessage("Phone number should not be empty")
        .isLength({ min: 10, max: 10 }).withMessage("Phone number must be 10 digits")
        .isNumeric().withMessage("Phone number must contain only digits"),

    body("role")
        .optional()
        .trim()
];

const userLoginValidator = () => [
    body("email")
        .trim()
        .notEmpty().withMessage("Email should not be empty")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password should not be empty")
        .isLength({ min: 6, max: 10 }).withMessage("Password should be 6-10 characters")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
];

const userIdValidator = () => [
    param("id")
        .trim()
        .notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid User ID")
];

// --------- Product Validators ---------
const productCreateValidator = () => [
    body("title")
        .trim()
        .notEmpty().withMessage("Title should not be empty"),

    body("description")
        .trim()
        .notEmpty().withMessage("Description should not be empty")
        .isLength({ min: 5, max: 20 }).withMessage("Description should be 5-20 characters"),

    body("price")
        .trim()
        .notEmpty().withMessage("Price should not be empty")
        .isNumeric().withMessage("Price should be numeric"),

    body("quantity")
        .trim()
        .notEmpty().withMessage("Quantity should not be empty")
        .isNumeric().withMessage("Quantity should be numeric"),

    body("stock")
        .trim()
        .notEmpty().withMessage("Stock should not be empty")
        .isNumeric().withMessage("Stock should be numeric")
];

const productIdValidator = () => [
    param("id")
        .trim()
        .notEmpty().withMessage("Product ID should not be empty")
        .isMongoId().withMessage("Invalid Product ID")
];

// --------- Order Validators ---------
const createOrderValidator = () => [
    body("shippingAddress.fullName")
        .notEmpty()
        .withMessage("Full Name is required"),

    body("shippingAddress.phone")
        .notEmpty()
        .withMessage("Phone is required"),

    body("shippingAddress.addressLine1")
        .notEmpty()
        .withMessage("Address is required"),

    body("shippingAddress.city")
        .notEmpty()
        .withMessage("City is required"),

    body("shippingAddress.state")
        .notEmpty()
        .withMessage("State is required"),

    body("shippingAddress.postalCode")
        .notEmpty()
        .withMessage("Postal Code is required"),

    body("shippingAddress.country")
        .notEmpty()
        .withMessage("Country is required"),

    body("paymentMethod")
        .isIn(["COD", "Stripe", "Razorpay"])
        .withMessage("Invalid payment method")
];

const orderIdParamValidator = () => [
    param("orderId")
        .trim()
        .notEmpty().withMessage("Order ID is required")
];

const userOrderHistoryValidator = () => [
    param("id")
        .trim()
        .notEmpty().withMessage("User ID is required"),

    query("page")
        .optional()
        .isInt({ gt: 0 }).withMessage("Page must be a positive integer"),

    query("limit")
        .optional()
        .isInt({ gt: 0 }).withMessage("Limit must be a positive integer")
];

const returnExchangeValidator = () => [
    body("orderId")
        .trim()
        .notEmpty().withMessage("Order ID is required"),

    body("reason")
        .trim()
        .notEmpty().withMessage("Reason is required")
];

const orderTrackingValidator = () => [
    param("id")
        .trim()
        .notEmpty().withMessage("Tracking ID is required")
];

// --------- Coupon Validators ---------
const couponValidator = () => [
    body("code")
        .trim()
        .notEmpty().withMessage("Code should not be empty"),

    body("discountType")
        .trim()
        .notEmpty().withMessage("Discount type should not be empty")
        .isIn(["Percentage", "Fixed"]).withMessage("Discount type must be either Percentage or Fixed"),

    body("discount")
        .trim()
        .notEmpty().withMessage("Discount should not be empty")
        .isNumeric().withMessage("Discount should be numeric"),

    body("minAmount")
        .trim()
        .notEmpty().withMessage("Minimum amount should not be empty")
        .isNumeric().withMessage("Minimum amount should be numeric"),

    body("isActive")
        .optional()
        .isBoolean().withMessage("isActive should be boolean")
];

// --------- Category Validators ---------
const categoryValidator = () => [
    body("name")
        .trim()
        .notEmpty().withMessage("Category name should not be empty")
];

// --------- Cart Validators ---------
const addToCartValidator = () => [
    param("productId")
        .trim()
        .notEmpty().withMessage("Product ID should not be empty")
        .isMongoId().withMessage("Invalid Product ID")
];

const removeFromCartValidator = () => [
    param("productId")
        .trim()
        .notEmpty().withMessage("Product ID should not be empty")
        .isMongoId().withMessage("Invalid Product ID")
];

const updateCartQuantityValidator = () => [
    param("productId")
        .trim()
        .notEmpty().withMessage("Product ID should not be empty")
        .isMongoId().withMessage("Invalid Product ID"),

    body("quantity")
        .trim()
        .notEmpty().withMessage("Quantity should not be empty")
        .isNumeric().withMessage("Quantity should be numeric")
];

// --------- User Block/Unblock Validators ---------
const blockUserValidator = () => [
    param("userId")
        .trim()
        .notEmpty().withMessage("User ID should not be empty")
        .isMongoId().withMessage("Invalid User ID")
];

const unblockUserValidator = () => [
    param("userId")
        .trim()
        .notEmpty().withMessage("User ID should not be empty")
        .isMongoId().withMessage("Invalid User ID")
];

module.exports = {
    userRegistrationValidator,
    userLoginValidator,
    userIdValidator,
    productCreateValidator,
    productIdValidator,
    createOrderValidator,
    orderIdParamValidator,
    userOrderHistoryValidator,
    returnExchangeValidator,
    orderTrackingValidator,
    couponValidator,
    categoryValidator,
    addToCartValidator,
    removeFromCartValidator,
    updateCartQuantityValidator,
    blockUserValidator,
    unblockUserValidator
};