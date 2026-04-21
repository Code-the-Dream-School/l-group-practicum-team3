// const jwt = require("jsonwebtoken"); Using built-in Supabase auth
const { StatusCodes } = require("http-status-codes");
const supabase = require("../config/supabase.js");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token" });
  }

  // Using Supabase.auth, no JWT needed
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid token" });
  }

  req.user = data.user; // <-- Attach user
  next();
};

module.exports = authMiddleware;
