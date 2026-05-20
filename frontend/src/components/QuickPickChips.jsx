import { Box, Chip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { QUICK_PICKS } from "../constants/RecipeConstant";

export default function QuickPickChips({ activeChip, onChipClick }) {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", mb: 1.5, fontWeight: 500 }}
      >
        Or pick one to find recipes:
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {QUICK_PICKS.map((chip) => (
          <Chip
            key={chip}
            label={chip.toUpperCase()}
            onClick={() => onChipClick(chip)}
            sx={{
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.04em",
              borderRadius: "50px",
              height: 36,
              cursor: "pointer",
              bgcolor:
                activeChip === chip
                  ? "secondary.main"
                  : alpha(theme.palette.primary.main, 0.06),
              color:
                activeChip === chip ? "secondary.contrastText" : "text.primary",
              border:
                activeChip === chip
                  ? "none"
                  : `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
              "&:hover": {
                bgcolor:
                  activeChip === chip
                    ? "#f0c420"
                    : alpha(theme.palette.primary.main, 0.12),
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
