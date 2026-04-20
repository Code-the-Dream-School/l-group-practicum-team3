import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes({ user }) {
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
