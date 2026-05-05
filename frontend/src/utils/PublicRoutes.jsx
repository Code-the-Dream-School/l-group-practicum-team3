import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function PublicRoutes() {
   const {user} = UserAuth()
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
