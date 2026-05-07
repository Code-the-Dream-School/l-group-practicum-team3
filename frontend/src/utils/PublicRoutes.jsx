import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function PublicRoutes() {
  const { user, isLoading } = UserAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent:'center', alignItems:'center', minHeight:'80vh'}}>
        <CircularProgress color="secondary"  aria-label="Loading…" />
      </Box>
    );
  }
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes;
