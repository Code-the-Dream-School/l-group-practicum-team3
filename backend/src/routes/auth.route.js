const express = require("express");
const router = express.Router();
const {
  login,
  register,
  loginGoogle,
  authCallback,
} = require("../controllers/auth.controller.js");

router.post("/register", register);
router.post("/login", login);

router.get("/auth/google", loginGoogle);
router.get("/auth/callback", authCallback);

module.exports = router;
