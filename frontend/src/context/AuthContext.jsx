import { createContext, useEffect, useState, useContext } from "react";
import api from "../utils/axios";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [session, setSession] = useState(undefined);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(savedUser));
    }
    
  }, []);

  // login
  const login = async (email, password) => {
    try {
      const response = await api.post("/api/users/login", { email, password });

      console.log("response", response)
      const { user, session} = response.data;

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
  };

  //   signup
  const register = async (name, email, password) => {
    try {
      const response = await api.post("/api/users/register", {
        name,
        email,
        password,
      });

      console.log('response', response)
    
      const { session, user } = response.data.data;

      if (!session) {
      // need to confirm email for signing up
      return { success: true, message: "Please check your email to confirm!" };
    }
      setSession(session);
      setUser(user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "SignUp failed",
      };
    }
  };

  // logout
  const logout = async () => {};

  const value = {
    user,
    session,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
const context = useContext(AuthContext);

  if (!context) {
    console.error("AuthContext not found! Check if Provider wraps your App.");
    return { user: null }; 
  }
  
  return context;
}
