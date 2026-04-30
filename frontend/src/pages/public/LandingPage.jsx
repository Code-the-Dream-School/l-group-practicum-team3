import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GoogleIcon from "@mui/icons-material/Google";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

import { useNavigate } from "react-router-dom";

function OverlineLabel({ icon, text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1.5 }}>
      <Box sx={{ color: "#8C7A39", display: "flex", fontSize: 15 }}>{icon}</Box>
      <Typography
        variant="overline"
        sx={{
          fontWeight: 800,
          color: "#8C7A39",
          letterSpacing: "0.1em",
          lineHeight: 1,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function CheckRow({ text }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <CheckCircleOutlinedIcon
        sx={{ color: "primary.main", fontSize: 20, flexShrink: 0 }}
      />
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        {text}
      </Typography>
    </Box>
  );
}

function KitchenHeroImage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 200, md: "100%" },
        minHeight: { md: 360 },
        borderRadius: "12px",
        overflow: "hidden",
        background: `linear-gradient(145deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, #52A85E 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 25% 75%, rgba(255,255,255,0.1) 0%, transparent 55%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 48,
          left: 24,
          right: 24,
          height: 2,
          bgcolor: alpha("#fff", 0.18),
          borderRadius: 2,
        }}
      />
    </Box>
  );
}

function ReceiptScanImage() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 200, md: 260 },
        borderRadius: "12px",
        background: "linear-gradient(160deg, #1a2535 0%, #243447 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: -20,
          left: -20,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.22)} 0%, transparent 70%)`,
        }}
      />
      <Box
        sx={{
          width: 96,
          bgcolor: "white",
          borderRadius: "6px",
          p: "11px 9px",
          boxShadow: "0 14px 44px rgba(0,0,0,0.5)",
          transform: "rotate(-5deg)",
          zIndex: 2,
        }}
      >
        {[80, 60, 90, 70, 50, 80, 65, 45].map((w, i) => (
          <Box
            key={i}
            sx={{
              height: 5,
              width: `${w}%`,
              bgcolor:
                i === 4 ? alpha(theme.palette.primary.main, 0.4) : "#DEDEDE",
              borderRadius: 1,
              mb: "5px",
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: "52%",
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent 5%, ${theme.palette.secondary.main} 40%, ${theme.palette.secondary.main} 60%, transparent 95%)`,
          opacity: 0.85,
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 12,
          left: 14,
          bgcolor: alpha(theme.palette.secondary.main, 0.15),
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.35)}`,
          borderRadius: "6px",
          px: 1,
          py: 0.4,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontSize: 9,
            fontWeight: 800,
            color: theme.palette.secondary.main,
            lineHeight: 1,
          }}
        >
          Safe AI Scan
        </Typography>
      </Box>
    </Box>
  );
}

function RecipeCard({ emoji, label, bg }) {
  return (
    <Box
      sx={{
        height: { xs: 120, md: 140 },
        borderRadius: "12px",
        background: bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform .18s, box-shadow .18s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.14)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.16), transparent 65%)",
        }}
      />
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, color: "rgba(255,255,255,0.9)", zIndex: 1 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

function StatPill({ emoji, value, label }) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "background.paper",
        borderRadius: "50px",
        px: 2,
        py: 0.8,
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <Typography sx={{ fontSize: 16 }}>{emoji}</Typography>
      <Box>
        <Typography
          variant="body2"
          sx={{ fontWeight: 800, color: "primary.dark", lineHeight: 1 }}
        >
          {value}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "primary.light", lineHeight: 1.2 }}
        >
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const RECIPES = [
    {
      label: "Salmon Salad",
      bg: `linear-gradient(145deg, ${theme.palette.primary.dark}, #52A85E)`,
    },
    {
      label: "Pasta Bowl",
      bg: "linear-gradient(145deg, #b8843a, #d4aa6a)",
    },
    {
      label: "Miso Ramen",
      bg: "linear-gradient(145deg, #7B3F8D, #C77DFF)",
    },
    {
      label: "Veggie Stew",
      bg: "linear-gradient(145deg, #C0392B, #E74C3C)",
    },
  ];

  const primaryPillBtn = {
    borderRadius: "50px",
    py: 1.5,
    fontWeight: "bold",
    textTransform: "none",
  };

  const googleBtn = {
    py: 1.5,
    fontWeight: "bold",
    color: "text.primary",
    bgcolor: "background.paper",
    borderColor: "#e0e0e0",
    borderRadius: "50px",
    textTransform: "none",
    "&:hover": { borderColor: "primary.light", backgroundColor: "transparent" },
  };

  return (
    <Box sx={{ bgcolor: "#FBF9F2", minHeight: "100vh" }}>
      {/* HERO */}
      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 2, md: 6 } }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            flexDirection: { xs: "column" },
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mb: 4 }}
            >
              <Avatar sx={{ bgcolor: "primary.dark", width: 40, height: 40 }}>
                <RestaurantIcon sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography
                variant="h4"
                sx={{ fontSize: 22, fontWeight: "bold", color: "primary.dark" }}
              >
                Smart Kitchen App
              </Typography>
            </Stack>

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 36, md: 52 },
                lineHeight: 1.1,
                letterSpacing: "-1px",
                color: "primary.dark",
                mb: 2,
              }}
            >
              Your Kitchen,{" "}
              <Box
                component="span"
                sx={{ position: "relative", display: "inline-block" }}
              >
                <Box component="span" sx={{ position: "relative", zIndex: 1 }}>
                  Smarter.
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 3,
                    left: 0,
                    right: 0,
                    height: "34%",
                    bgcolor: "secondary.main",
                    zIndex: 0,
                    borderRadius: "3px",
                  }}
                />
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "primary.light",
                mb: { xs: 3, md: 4 },
                maxWidth: 420,
                lineHeight: 1.65,
              }}
            >
              Effortlessly track your inventory and discover recipes you can
              actually make today with our AI-powered kitchen assistant.
            </Typography>
            <Stack
              spacing={1.5}
              sx={{ mb: { xs: 3, md: 4 }, maxWidth: { md: 380 } }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/signup")}
                sx={{ ...primaryPillBtn }}
              >
                Get Started for Free
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{ ...googleBtn }}
              >
                Continue with Google
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/login")}
                sx={{
                  ...primaryPillBtn,
                  color: "text.primary",
                  bgcolor: "#EFEEE7",
                  borderColor: "#e0e0e0",
                  "&:hover": {
                    borderColor: "primary.light",
                    backgroundColor: "transparent",
                  },
                }}
              >
                Log In
              </Button>
            </Stack>

            {/* Social proof pills — desktop only */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1.5,
                flexWrap: "wrap",
              }}
            ></Box>
          </Box>

          {/* Right — hero image */}
          <Box sx={{ height: { xs: 200, md: 420 } }}>
            <KitchenHeroImage />
          </Box>
        </Box>
      </Container>

      {/* FEATURES (desktop) */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          bgcolor: "primary.main",
          py: 2.5,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 4,
            }}
          >
            {[
              {
                title: "Snap a receipt",
                desc: "AI reads it instantly",
              },
              {
                title: "Track inventory",
                desc: "Never waste food again",
              },
              {
                title: "Cook smarter",
                desc: "Recipes from what you have",
              },
            ].map((f) => (
              <Box
                key={f.title}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Typography sx={{ fontSize: 24 }}>{f.emoji}</Typography>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, color: "white" }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: alpha("#fff", 0.6) }}
                  >
                    {f.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

      {/* AI RECEIPT SCANNING */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 } }}>
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            flexDirection: { xs: "column" },
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          {/* Image — desktop left */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <ReceiptScanImage />
          </Box>

          {/* Text panel  */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#F5F4ED",
              borderRadius: "12px",
              p: { xs: 3, md: 4 },
            }}
          >
            <OverlineLabel
              icon={<AutoAwesomeIcon fontSize="inherit" />}
              text="AI Receipt Scanning"
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "primary.dark",
                mb: 1.5,
                fontSize: { xs: 26, md: 32 },
              }}
            >
              Scan. Track. Save.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7 }}
            >
              Stop manual entry. Just snap a photo of your grocery receipt. Our
              AI automatically identifies items, quantities, and predicts
              expiration dates so you never waste food again.
            </Typography>
            <Stack spacing={1.2} sx={{ mb: 3 }}>
              {[
                "Automatic pantry updates",
                "Smart expiration alerts",
                "Zero manual data entry",
              ].map((f) => (
                <CheckRow key={f} text={f} />
              ))}
            </Stack>
            <Button
              variant="contained"
              color="primary"
              sx={{ ...primaryPillBtn, px: 3 }}
            >
              Try Receipt Scanning
            </Button>
          </Paper>

          {/* Image — mobile below text */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <ReceiptScanImage />
          </Box>
        </Box>
      </Container>

      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

      {/*  RECIPE SUGGESTIONS */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 10 } }}>
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            flexDirection: { xs: "column" },
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          {/* Text panel */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: "#F5F4ED",
              borderRadius: "12px",
              p: { xs: 3, md: 4 },
            }}
          >
            <OverlineLabel
              icon={<MenuBookOutlinedIcon fontSize="inherit" />}
              text="Recipe Suggestions"
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "primary.dark",
                mb: 1.5,
                fontSize: { xs: 26, md: 32 },
              }}
            >
              Cook with What You Have.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7 }}
            >
              Select one item from your fridge, and we'll find the perfect
              recipe to build around it. Simple, fast, and zero waste.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/recipes")}
              sx={{ ...primaryPillBtn, px: 3 }}
            >
              Explore Recipes
            </Button>
          </Paper>

          {/* Recipe grid */}
          <Box
            sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
          >
            {RECIPES.slice(0, window.innerWidth < 900 ? 2 : 4).map((r, i) => (
              <Box
                key={i}
                sx={{ display: i >= 2 ? { xs: "none", md: "block" } : "block" }}
              >
                <RecipeCard {...r} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />

      {/*  CTA BANNER */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "primary.main",
            borderRadius: "12px",
            p: { xs: "40px 28px", md: "64px 72px" },
            textAlign: { xs: "center", md: "left" },
            position: "relative",
            overflow: "hidden",
            display: { md: "flex" },
            alignItems: { md: "center" },
            justifyContent: { md: "space-between" },
            gap: { md: 6 },
          }}
        >
          {/* subtle orbs */}
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <Box sx={{ mb: { xs: 3.5, md: 0 }, flex: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "white",
                mb: 1.5,
                fontSize: { xs: 24, md: 34 },
                lineHeight: 1.25,
              }}
            >
              Ready to simplify your daily cooking?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: alpha("#fff", 0.72),
                lineHeight: 1.7,
                fontSize: { xs: 14, md: 16 },
              }}
            >
              Join over 50,000 households using Smart Kitchen App to save time,
              reduce waste, and eat better every single day.
            </Typography>
          </Box>

          <Stack
            spacing={1.5}
            alignItems={{ xs: "center", md: "flex-start" }}
            sx={{ flexShrink: 0 }}
          >
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/signup")}
              sx={{
                ...primaryPillBtn,
                px: { xs: 4, md: 5 },
                fontSize: { xs: 15, md: 16 },
                whiteSpace: "nowrap",
              }}
            >
              Get Started Now
            </Button>
            <Typography variant="caption" sx={{ color: alpha("#fff", 0.45) }}>
              Free forever · No credit card
            </Typography>
          </Stack>
        </Paper>
      </Container>

      {/*  FOOTER */}
      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.1) }} />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Box
          sx={{
            display: { xs: "flex", md: "flex" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: { md: "space-between" },
            textAlign: { xs: "center", md: "left" },
            gap: 2,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Avatar sx={{ bgcolor: "primary.dark", width: 32, height: 32 }}>
              <RestaurantIcon sx={{ fontSize: 16 }} />
            </Avatar>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "primary.dark" }}
            >
              Smart Kitchen App
            </Typography>
          </Stack>

          <Typography variant="caption" sx={{ color: "primary.light" }}>
            © 2026 Smart Kitchen App. All rights reserved.
          </Typography>

          {/* Desktop footer links */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {["Privacy", "Terms", "Contact"].map((l) => (
              <Typography
                key={l}
                variant="caption"
                sx={{
                  color: "primary.light",
                  cursor: "pointer",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {l}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Legal text  */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: "text.secondary",
            fontSize: 10,
            mt: 3,
          }}
        >
          BY USING SMART KITCHEN APP, YOU AGREE TO OUR TERMS OF SERVICE AND
          PRIVACY POLICY.
        </Typography>
      </Container>
    </Box>
  );
}
