// Supabase client set-up (maybe move this later)
const { supabase } = require("../config/db.supabase.js");
// Status Codes
const { StatusCodes } = require("http-status-codes");
// For validation
const { registerSchema, loginSchema } = require("../validation/user.schema.js");

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

    return res.status(StatusCodes.CREATED).json({ data });
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
    // joi validation
    const { value, error: validationError } = loginSchema.validate(req.body);
    if (validationError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: validationError.message,
      });
    }
    const { email, password } = value;

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
      options: {
        redirectTo: `http://localhost:${process.env.PORT}/api/users/auth/callback`, // callback route
      },
    });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }

    if (data.url) {
      return res.redirect(data.url); // redirect the browser to Google's auth page
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "No redirect URL returned from Supabase",
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Unexpected error during Google login",
      error: err.message,
    });
  }
};

// Additional endpoint for google OAuth. Flow is:
// Frontend hits google login -> Google -> hits authCallback -> go to "/"
const authCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "No code provided" });
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }

  return res.redirect(process.env.FRONTEND_URL); // where to redirect to after google login
};

module.exports = { register, login, loginGoogle, authCallback };
