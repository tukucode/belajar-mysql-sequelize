import multer from "multer";
import message from "../utils/message.js";
import path from "path";

const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname.toLowerCase());
    const rename = `image_${Date.now()}${ext}`;
    cb(null, rename);
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname.toLowerCase());
    const isNotAllowExt = ![".png", ".jpg", ".jpeg"].includes(ext);
    if (isNotAllowExt) {
      const newMessage = {
        message: "Extention image must be jpg/jpeg/png",
        code: "WRONG_TYPE_FILE",
      };
      cb(newMessage, false);
      return;
    }
    cb(null, true);
  },
});

/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 * @typedef {import('express').NextFunction} ExpressNext
 */

/**
 * Route handler for the root endpoint.
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 * @param {ExpressNext} next
 */

// Middleware
export default function uploadImg(req, res, next) {
  const singleUpload = upload.single("image");

  singleUpload(req, res, (err) => {
    if (err) {
      switch (err.code) {
        case "LIMIT_FILE_SIZE":
          return message(res, 413, err.message);

        case "WRONG_TYPE_FILE":
          return message(res, 400, err.message);

        default:
          return message(res, 500, err.message || "Something wrong on multer");
      }
    }

    next();
  });
}
