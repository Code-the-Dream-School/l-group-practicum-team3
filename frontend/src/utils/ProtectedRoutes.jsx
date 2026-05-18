import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function ProtectedRoutes() {
  const { user, isLoading } = UserAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress color="secondary" aria-label="Loading…" />
      </Box>
    );
  }
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
