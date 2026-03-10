const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {

        let folder = "QuickCart/others"; // default folder

        // agar request user route se aayi
        if (req.baseUrl.includes("users")) {
            folder = "QuickCart/users/profile";
        }

        // agar request product route se aayi
        if (req.baseUrl.includes("products")) {
            folder = "QuickCart/products/images";
        }

        return {
            folder: folder,
            allowed_formats: ["jpg", "png", "jpeg"],
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

const upload = multer({ storage });

module.exports = upload;