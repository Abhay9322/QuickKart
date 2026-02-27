const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "QuickCart", // cloud folder name
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [
            {
                width: 400,
                height: 400,
                crop: "fill",
                quality: "auto"
            }
        ]
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;