const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public", "courses", "covers"));
    },

    filename: function (req, file, cb) {
        const filename = Date.now() + String(Math.random() * 100000)
        const ext = path.extname(file.originalname);
        cb(null, `${filename}${ext}`);

        // const validFormats = [".jpg", ".jpeg", ".png"];
        const validMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

        // if (validMimeTypes.includes(file.mimetype)) {
        //     cb(null, `${filename}${ext}`);
        // } else {
        //     cb(new Error("Only .jpg | .jpeg | .png are valid files"));
        // }
    },
});





module.exports = storage;
