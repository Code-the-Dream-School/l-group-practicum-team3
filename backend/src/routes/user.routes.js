const express = require("express");
const router = express.Router();
const {
  login,
  register,
  loginGoogle,
} = require("../controllers/user.controller");

router.post("/register", register);
router.post("/login", login);

router.get("/loginGoogle", loginGoogle);

module.exports = router;
