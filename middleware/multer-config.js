const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + "/../client/public/uploads/posts");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');

        callback(null, Date.now() + "_" + name);
    }
});

module.exports = multer({ storage: storage }).single('file');