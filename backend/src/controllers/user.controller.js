// Supabase client set-up (maybe move this later)
const { supabase } = require("../config/db.supabase.js");
// Status Codes
const { StatusCodes } = require("http-status-codes");
// For validation
const { registerSchema } = require("../validation/user.schema");

// ********************************************************************
// ENDPOINTS
// ********************************************************************

// register
const register = async (req, res) => {
  // joi validation
  const { value, error: validationError } = registerSchema.validate(req.body);
  if (validationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: validationError.message,
    });
  }

  // supabase signup
  const { data, error: supabaseError } = await supabase.auth.signUp({
    email: value.email,
    password: value.password,
    options: {
      data: {
        display_name: value.name,
      },
    },
  });
  if (supabaseError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: supabaseError.message });
  }

  return res.status(StatusCodes.OK).json({ data });
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }

  return res.status(StatusCodes.OK).json({
    session: data.session,
    user: data.user,
  });
};

// google login
const loginGoogle = async (req, res) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error)
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });

  return res.json(data.url); // redirect user to frontend URL/dashboard
};

module.exports = { register, login, loginGoogle };
