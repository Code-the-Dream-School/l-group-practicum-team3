const express = require("express");
const router = express.Router();
const multer = require("multer");
const { scan } = require("../controllers/ai.controller.js");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and WEBP images are allowed"));
    }

    cb(null, true);
  },
});

router.post("/scan", upload.single("file"), scan);

module.exports = router;
