import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import GoogleIcon from "@mui/icons-material/Google";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, googleLogin } = UserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setLoading(true);

      try {
        const result = await register(name, email, password);
        if (result.success) {
          alert(result.message);
          navigate("/login");
        } else {
          setError(result.message || "Registration failed");
        }
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again");
      } finally {
        setLoading(false);
      }
    }
  };

  const validate = () => {
    const errors = {};

    const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) {
      errors.name = "Name is Required";
    }
    if (!email) {
      errors.email = "Email is Required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid Email Format";
    }

    if (!password) {
      errors.password = "Password is Required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Must be 8+ characters with at least 1 number and 1 symbol";
    }

    return errors;
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={{ mt: "2rem", padding: 4, bgcolor: "#FBF9F2" }}
        >
          <Stack
            direction="row"
            sx={{ alignItems: "center", alignSelf: "center", mb: 4 }}
            spacing={2}
          >
            <Avatar
              sx={{
                bgcolor: "primary.dark",
                width: 40,
                height: 40,
              }}
            >
              <RestaurantIcon sx={{ fontSize: 20 }} />
            </Avatar>
            <Typography
              variant="h4"
              sx={{
                fontSize: 28,
                fontWeight: "bold",
                color: "primary.dark",
              }}
            >
              Smart Kitchen App
            </Typography>
          </Stack>
          <Typography
            variant="h4"
            sx={{
              fontSize: 36,
              fontWeight: "bold",
              mb: 1,
              color: "text.primary",
            }}
          >
            Sign Up
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            Start your journey to a more organized kitchen.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={()=>googleLogin()}
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
              padding: 0,
              borderRadius: "12px",
              mb: 8,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                variant="overline"
                sx={{ fontWeight: "800", ml: 1.5, color: "#8C7A39" }}
              >
                Name
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Jamie Oliver"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={formErrors.name ? true : false}
                helperText={formErrors.name}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F5F4ED",
                  },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                variant="overline"
                sx={{ fontWeight: "800", ml: 1.5, color: "#8C7A39" }}
              >
                Email Address
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="jamie@kitchenapp.com"
                autoFocus
                type="email"
                error={formErrors.email ? true : false}
                helperText={formErrors.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F5F4ED",
                  },
                }}
              ></TextField>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography
                variant="overline"
                sx={{ fontWeight: "800", ml: 1.5, color: "#8C7A39" }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="••••••••"
                type="password"
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
                    backgroundColor: "#F5F4ED",
                  },
                }}
              ></TextField>
            </Box>
            <Button
              variant="contained"
              color="primary"
              loadingPosition="end"
              loading={loading}
              fullWidth
              sx={{ borderRadius: "50px", py: 1.5, mt: 2, fontWeight: "bold" }}
              type="submit"
            >
              Create Account
            </Button>
          </Box>

          <Stack direction={"row"} sx={{ justifyContent: "center", gap: 2 }}>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Already have an account?
            </Typography>
            <Link href="/login" underline="none" sx={{ fontWeight: "bold" }}>
              Log In
            </Link>
          </Stack>
          <Typography
            sx={{
              my: 2,
              typography: "caption",
              color: "text.secondary",
              fontSize: 10,
            }}
          >
            BY SIGNING UP, YOU AGREE TO OUR TERMS OF SERVICE AND PRIVACY POLICY.
          </Typography>
        </Paper>
      </Container>
    </>
  );
}

export default Signup;
