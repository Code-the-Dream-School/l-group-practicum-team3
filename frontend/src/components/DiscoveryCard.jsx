import { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { recipeEmoji } from "../constants/RecipeConstant";

export default function DiscoveryCard({
  recipe,
  isFavorited,
  onToggleFavorite,
}) {
  const theme = useTheme();
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "16px",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform .18s, box-shadow .18s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* ── Image ── */}
      <Box sx={{ position: "relative", height: 160, flexShrink: 0 }}>
        {recipe.image && !imgError ? (
          <CardMedia
            component="img"
            image={recipe.image}
            alt={recipe.title}
            onError={() => setImgError(true)}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(145deg,
                ${alpha(theme.palette.primary.main, 0.08)},
                ${alpha(theme.palette.secondary.main, 0.12)})`,
            }}
          >
            <Typography sx={{ fontSize: 56 }}>
              {recipeEmoji(recipe.id)}
            </Typography>
          </Box>
        )}

        {/* Favorite toggle */}
        <IconButton
          size="small"
          onClick={() => onToggleFavorite(recipe)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            width: 32,
            height: 32,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            "&:hover": { bgcolor: "white" },
          }}
        >
          {isFavorited ? (
            <FavoriteIcon sx={{ fontSize: 16, color: "error.main" }} />
          ) : (
            <FavoriteBorderIcon
              sx={{ fontSize: 16, color: "text.secondary" }}
            />
          )}
        </IconButton>
      </Box>

      {/* ── Content ── */}
      <CardContent
        sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Diet label + time */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.8,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              fontWeight: 800,
              fontSize: 9,
              color: "typography.color",
              letterSpacing: "0.08em",
              lineHeight: 1,
            }}
          >
            {recipe.diet ||
              recipe.usedIngredients?.[0]?.toUpperCase() ||
              "RECIPE"}
          </Typography>

          {recipe.readyInMinutes && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              <AccessTimeIcon sx={{ fontSize: 11, color: "text.secondary" }} />
              <Typography
                variant="caption"
                sx={{ fontSize: 10, color: "text.secondary", fontWeight: 600 }}
              >
                {recipe.readyInMinutes} MIN
              </Typography>
            </Box>
          )}
        </Box>

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            fontSize: 14,
            lineHeight: 1.3,
            mb: 1.5,
            flexGrow: 1,
          }}
        >
          {recipe.title}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            borderRadius: "50px",
            borderColor: alpha(theme.palette.primary.main, 0.25),
            color: "text.primary",
            fontWeight: 700,
            fontSize: 11,
            py: 0.8,
            textTransform: "none",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: alpha(theme.palette.primary.main, 0.04),
            },
          }}
        >
          VIEW RECIPE
        </Button>
      </CardContent>
    </Card>
  );
}
