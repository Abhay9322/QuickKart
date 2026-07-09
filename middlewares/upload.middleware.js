const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../db/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => {

        console.log("File received =>", file);

        let folder = "QuickCart/others";

        if (req.baseUrl.includes("users")) {
            folder = "QuickCart/users/profile";
        }

        if (req.baseUrl.includes("products")) {
            folder = "QuickCart/products/images";
        }

        return {
            folder,
            transformation: [
                {
                    width: 400,
                    height: 400,
                    crop: "fill",
                    quality: "auto"
                }
            ]
        };
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 5MB
    }
});

module.exports = upload;