import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";

function ProtectedRoutes() {
  const {user} = UserAuth()
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet /> 
      </main>
           
    </div>
  );
}

export default ProtectedRoutes;
