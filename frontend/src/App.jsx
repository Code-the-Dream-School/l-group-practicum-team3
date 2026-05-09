import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import CssBaseline from "@mui/material/CssBaseline";

import LandingPage from "./pages/public/LandingPage";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";

import Home from "./pages/private/Home";
import Fridge from "./pages/private/Fridge";
import Recipes from "./pages/private/Recipes";
import ShoppingList from "./pages/private/ShoppingList";

import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";


function App() {
  const user = null

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes user={user}/>}>
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Prviate Routes */}
        <Route element={<ProtectedRoutes user={user}/>}>
            <Route path="/" element={<Home />} />
            <Route path="/fridge" element={<Fridge />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      </ThemeProvider>
  );
}

export default App;
