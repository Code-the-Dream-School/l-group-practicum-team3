import { createContext, useEffect, useState, useContext } from "react";
import api from "../utils/axios";
import { useMemo } from "react";
import { useCallback } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    try {
      // get the token from url
      const params = new URLSearchParams(window.location.search);
      const tokenFromUrl = params.get("access_token");

      if (tokenFromUrl) {
        // use 3 dots to verify if JWT is valid
        const tokenParts = tokenFromUrl.split(".");
        const isJWTValid = tokenParts.length === 3;

        if (isJWTValid) {
          localStorage.setItem("token", tokenFromUrl);
          setSession({ access_token: tokenFromUrl });
          // use atob() to decodes the Base64 string and get user info 
          const payload = JSON.parse(atob(tokenParts[1]));
          const googleUser = {
            loggedIn: true,
            type: "google",
            id: payload.sub,
            email: payload.email,
          };
      
          setUser(googleUser);
          localStorage.setItem("user", JSON.stringify(googleUser));

          // Clean the URL so the long token in url disappears
          window.history.replaceState({}, document.title, "/home");
        } else {
          setAuthError("Google token invalid. Please try again.")
          setUser(null);
        }
      } else {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      setAuthError("An unexpected error occurred. Please try again");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // clean auth error 
  const clearAuthError = useCallback(() => setAuthError(""), []);

  // login
  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post("/api/users/login", { email, password });

      const { user, session } = response.data;

      setSession(session);
      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", session.access_token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  }, []);

  //   signup
  const register = useCallback(async (name, email, password) => {
    try {
      const response = await api.post("/api/users/register", {
        name,
        email,
        password,
      });

      const { session, user } = response.data.data;

      if (!session) {
        // need to confirm email for signing up
        return {
          success: true,
          message: "Please check your email to confirm!",
        };
      }
      setSession(session);
      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", session.access_token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "SignUp failed",
      };
    }
  }, []);

  // logout
  const logout = useCallback(async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setSession(null);
    setUser(null);
  }, []);

  // google login
  const googleLogin = useCallback(async () => {
    try {
      const baseURL = import.meta.env.VITE_API_URL;
      window.location.href = `${baseURL}/api/users/auth/google`;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Google Login Failed",
      };
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      isLoading,  
      authError,
      login,
      register,
      logout,
      googleLogin,
      clearAuthError
    }),
    [user, session, isLoading,authError, login, register, logout, googleLogin, clearAuthError],
  );

  return (
    <AuthContext.Provider value={value}>
      {!isLoading ? children : null}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    return { user: null, isLoading: false };
  }
  return context;
}
