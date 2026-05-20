const express = require("express");
const router = express.Router();
const multer = require("multer");
const { scan } = require("../controllers/ai.controller.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/scan", upload.single("file"), scan);

module.exports = router;
