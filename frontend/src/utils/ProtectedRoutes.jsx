import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedRoutes({ user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
      <Navbar />
    </div>
  );
}

export default ProtectedRoutes;
