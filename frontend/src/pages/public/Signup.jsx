import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import GoogleIcon from "@mui/icons-material/Google";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing Upwith:", { email, password });
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
                Full Name
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Jamie Oliver"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F5F4ED",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiOutlinedInput-input": { paddingLeft: "24px" },
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                 sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F5F4ED",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiOutlinedInput-input": { paddingLeft: "24px" },
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F5F4ED",
                    "& fieldset": { border: "none" },
                  },
                  "& .MuiOutlinedInput-input": { paddingLeft: "24px" },
                }}
            ></TextField>
            </Box>
            <Button
              variant="contained"
              color="primary"
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
