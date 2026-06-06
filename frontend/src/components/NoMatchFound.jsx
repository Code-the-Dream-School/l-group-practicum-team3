import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

/**
 * Shown in the Discovery section when a search returns 0 results.
 * Matches the Figma "Recipe – Not Found" screen.
 *
 * Props:
 *   searchedTerm    – what the user searched (e.g. "Dragonfruit")
 *   suggestedItem   – an expiring fridge item to suggest (optional)
 *   onViewRecipe    – called when "→ VIEW RECIPE" is clicked
 */
export default function NoMatchFound({
  searchedTerm,
  suggestedItem,
  onViewRecipe,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: 6,
        px: 3,
      }}
    >
      {/* "NO MATCH FOUND" — yellow bold heading matching Figma */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          fontSize: { xs: 28, md: 34 },
          color: "secondary.contrastText", // #725B00 — dark yellow from theme
          backgroundColor: "secondary.main", // #FDD34D yellow pill background
          px: 3,
          py: 1,
          borderRadius: "12px",
          mb: 3,
          letterSpacing: "0.02em",
        }}
      >
        NO MATCH FOUND
      </Typography>

      {/* Body copy */}
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", lineHeight: 1.8, mb: 3 }}
      >
        {searchedTerm ? (
          <>
            Nothing for{" "}
            <Typography
              component="span"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {searchedTerm}
            </Typography>{" "}
            just yet.
          </>
        ) : (
          "No recipes found for that ingredient."
        )}

        {suggestedItem && (
          <>
            <br />
            Try your{" "}
            <Typography
              component="span"
              sx={{ fontWeight: 700, color: "primary.main" }}
            >
              {suggestedItem.name}
            </Typography>{" "}
            instead?
            <br />
            It's set to expire in{" "}
            <Typography
              component="span"
              sx={{ fontWeight: 700, color: "error.main" }}
            >
              {suggestedItem.daysLeft} days
            </Typography>
            !
          </>
        )}
      </Typography>

      {/* CTA button — only shown when there's a suggestion */}
      {suggestedItem && onViewRecipe && (
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIcon />}
          onClick={onViewRecipe}
          sx={{
            backgroundColor: "neutral.light", // #EFEDE7 from theme
            borderColor: "transparent",
            color: "text.primary",
            fontWeight: 700,
            px: 4,
            py: 1.4,
            fontSize: 13,
            "&:hover": {
              backgroundColor: "neutral.main",
              borderColor: "transparent",
            },
          }}
        >
          VIEW RECIPE
        </Button>
      )}
    </Box>
  );
}
