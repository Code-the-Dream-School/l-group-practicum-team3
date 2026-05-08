import { createContext, useEffect, useState, useContext } from "react";
import api from "../utils/axios";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [session, setSession] = useState(undefined);
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // get the token from url
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace("#", "?"));
      const tokenFromUrl = params.get("access_token");

      if (tokenFromUrl) {
        localStorage.setItem("token", tokenFromUrl);
        setSession({ access_token: tokenFromUrl });
        const googleUser = { loggedIn: true, type: "google" };
        setUser(googleUser);
        localStorage.setItem("user", JSON.stringify(googleUser));

        // Clean the URL so the long token in url disappears
        window.history.replaceState({}, document.title, "/");
      } else {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // login
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/users/login", { email, password });

      const { user, session } = response.data;

      setSession(session);
      setUser(user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", session.access_token);

      return { success: true};
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  //   signup
  const register = async (name, email, password) => {
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
  };

  // logout
  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setSession(null);
    setUser(null);
  };

  // google login
  const googleLogin = async () => {
    try {
      const response = await api.get("/api/users/loginGoogle");

      const googleRedictURL = response.data.url;

      if (googleRedictURL) {
        window.location.href = googleRedictURL;
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Google Login Failed",
      };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    login,
    register,
    logout,
    googleLogin,
  };

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
