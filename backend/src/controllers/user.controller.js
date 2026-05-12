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
  try {
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
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unexpected error during registration",
      error: err.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }

    return res.status(StatusCodes.OK).json({
      session: data.session,
      user: data.user,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unexpected error during login",
      error: err.message,
    });
  }
};

// google login
const loginGoogle = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    return res.json({ url: data.url });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unexpected error during Google login",
      error: err.message,
    });
  }
};

module.exports = { register, login, loginGoogle };
