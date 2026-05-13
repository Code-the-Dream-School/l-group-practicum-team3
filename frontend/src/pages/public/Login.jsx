import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { validate } from "../../utils/validate";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login, googleLogin } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const values = {email, password}

    const errors = validate(values);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      try {
        const result = await login(email, password);
        if (result.success) {
          navigate("/");
        } else {
          setError(result.message || "Login failed");
        }
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again");
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <>
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{ mt: "1rem", padding: 2, bgcolor: "#FBF9F2" }}
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
          <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
            Your digital culinary assistant.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            fullWidth
            variant="outlined"
            onClick={()=>googleLogin()}
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
            noValidate
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
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formErrors.email ? true : false}
              helperText={formErrors.email}
              sx={{
                mt: 0,
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
            ></TextField>
            <TextField
              fullWidth
              required
              placeholder="Enter Password"
              type="password"
              label="Password"
              error={formErrors.password ? true : false}
              helperText={
                formErrors.password
                  ? formErrors.password
                  : "Must be 8+ characters with at least 1 number and 1 symbol"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
            ></TextField>
            <Button
              variant="contained"
              color="secondary"
              loadingPosition="end"
              loading={loading}
              fullWidth
              sx={{ borderRadius: "50px", py: 1.5, mt: 1, fontWeight: "bold" }}
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
