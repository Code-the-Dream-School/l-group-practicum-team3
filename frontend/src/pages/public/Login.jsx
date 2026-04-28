import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Logging in with:', { email, password });
  };

  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{ mt: "2rem", padding: 4, bgcolor: "#FBF9F2" }}
        >
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "primary.dark",
              textAlign: "center",
              mb: 2,
              width: 56,
              height: 56,
            }}
          >
            <RestaurantIcon sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontSize: 32,
              fontWeight: "bold",
              mb: 1,
              color: "primary.dark",
            }}
          >
            Smart Kitchen App
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", mb: 4 }}>
            Your digital culinary assistant.
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              color: "text.primary",
              bgcolor: "background.paper",
              borderColor: "#e0e0e0",
              "&:hover": {
                borderColor: "primary.light",
                backgroundColor: "transparent",
              },
            }}
          >
            Continue with Google
          </Button>

          <Divider
            sx={{ my: 3, typography: "caption", color: "text.secondary" }}
          >
            OR
          </Divider>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "#F5F4ED",
              padding: 3,
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "left",
                fontWeight: "bold",
              }}
            >
              Login
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "left" }}>
              Please enter your credentials to continue.
            </Typography>
            <TextField
              fullWidth
              required
              placeholder="Enter Email Address"
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mt: 0,
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                   "& fieldset": { border: "none" }
                },
                "& .MuiOutlinedInput-input": {
                  paddingLeft: "20px",
                },
              }}
            ></TextField>
            <TextField
              fullWidth
              required
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                   "& fieldset": { border: "none" }
                },
                "& .MuiOutlinedInput-input": {
                  paddingLeft: "20px",
                },
              }}
            ></TextField>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ borderRadius: "50px", py: 1.5, mt: 2, fontWeight: "bold" }}
              type="submit"
              endIcon={<ArrowForwardIcon />}
            >
              Sign In
            </Button>
          </Box>

          <Divider
            sx={{ my: 3, typography: "caption", color: "text.secondary" }}
          >
            NEW HERE?
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/signup")}
            sx={{
              py: 1.5,
              fontWeight: "bold",
              color: "text.primary",
              bgcolor: "#EFEEE7",
              borderColor: "#e0e0e0",
              "&:hover": {
                borderColor: "primary.light",
                backgroundColor: "transparent",
              },
            }}
          >
            Create an Account
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
