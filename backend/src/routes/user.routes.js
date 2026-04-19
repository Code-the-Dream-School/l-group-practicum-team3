const express = require("express");
const router = express.Router();
const {
  login,
  register,
  loginGoogle,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/loginGoogle", loginGoogle);

module.exports = router;
