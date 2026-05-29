import { useState } from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  IconButton,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { recipeEmoji } from "../constants/RecipeConstant";

export default function FavoriteRow({ recipe, onRemove }) {
  const theme = useTheme();
  const [imgError, setImgError] = useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 1.5,
        borderRadius: "16px",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        bgcolor: theme.palette.background.paper,
        transition: "box-shadow .18s",
        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.07)" },
      }}
    >
      {/* Thumbnail */}
      <Avatar
        variant="rounded"
        src={!imgError ? recipe.image : undefined}
        slotProps={{
          img: { onError: () => setImgError(true) },
        }}
        sx={{
          width: 64,
          height: 64,
          borderRadius: "12px",
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          fontSize: 28,
          flexShrink: 0,
        }}
      >
        {recipeEmoji(recipe.spoonacular_id || recipe.id)}
      </Avatar>

      {/* Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            fontSize: 15,
            lineHeight: 1.3,
            mb: 0.4,
          }}
        >
          {recipe.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {recipe.meal_type || "RECIPE"}
          {recipe.readyInMinutes ? ` • ${recipe.readyInMinutes} MIN` : ""}
        </Typography>
      </Box>

      {/* Remove button */}
      <IconButton
        size="small"
        onClick={() => onRemove(recipe)}
        sx={{ color: "error.main", flexShrink: 0 }}
      >
        <FavoriteIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Paper>
  );
}
