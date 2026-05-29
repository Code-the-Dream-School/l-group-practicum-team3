import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Stack,
  Paper,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SearchBar from "../../components/SearchBar";
import QuickPickChips from "../../components/QuickPickChips";
import DiscoveryCard from "../../components/DiscoveryCard";
import FavoriteRow from "../../components/FavoriteRow";
import { useRecipes } from "../../hooks/UserRecipes";

export default function Recipes() {
  const theme = useTheme();

  const {
    query,
    activeChip,
    discovery,
    favorites,
    favoritedIds,
    loadingSearch,
    searchError,
    setQuery,
    handleChipClick,
    handleKeyDown,
    handleToggleFavorite,
    handleRemoveFavorite,
  } = useRecipes();

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        pb: { xs: 12, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: { md: 860, lg: 1000 },
          mx: "auto",
          px: { xs: 2.5, md: 4 },
          pt: { xs: 3, md: 5 },
        }}
      >
        {/* ── Mobile logo ── */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
            mb: 2.5,
          }}
        >
          <Typography sx={{ fontSize: 18 }}>🌿</Typography>
          <Typography
            sx={{ fontWeight: 800, fontSize: 17, color: "primary.main" }}
          >
            Smart Kitchen App
          </Typography>
        </Box>

        {/* ── Title ── */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "primary.main",
            fontSize: { xs: 32, md: 38 },
            mb: 3,
          }}
        >
          Recipes
        </Typography>

        {/* ── Search ── */}
        <SearchBar
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* ── Quick picks ── */}
        <QuickPickChips activeChip={activeChip} onChipClick={handleChipClick} />

        {/* ── Discovery List ── */}
        <Box sx={{ mb: 5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2.5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                fontSize: { xs: 24, md: 28 },
              }}
            >
              Discovery List
            </Typography>
            {loadingSearch && <CircularProgress size={20} color="primary" />}
          </Box>

          {searchError && (
            <Alert severity="warning" sx={{ mb: 2, borderRadius: "12px" }}>
              {searchError}
            </Alert>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: { xs: 1.5, md: 2 },
            }}
          >
            {discovery.map((recipe) => (
              <DiscoveryCard
                key={recipe.id}
                recipe={recipe}
                isFavorited={favoritedIds.has(recipe.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </Box>
        </Box>

        <Divider
          sx={{ borderColor: alpha(theme.palette.primary.main, 0.1), mb: 4 }}
        />

        {/* ── Favorited Recipes ── */}
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2.5,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                fontSize: { xs: 24, md: 28 },
              }}
            >
              Favorited Recipes
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                letterSpacing: "0.06em",
                cursor: "pointer",
                "&:hover": { color: "primary.main" },
              }}
            >
              VIEW ALL
            </Typography>
          </Box>

          {favorites.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "16px",
                backgroundColor: "textField.bgColor",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: 40, mb: 1 }}>🤍</Typography>
              <Typography variant="body2" color="text.secondary">
                No favorites yet. Heart a recipe to save it here.
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={1.5}>
              {favorites.map((fav) => (
                <FavoriteRow
                  key={fav.id}
                  recipe={fav}
                  onRemove={handleRemoveFavorite}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
