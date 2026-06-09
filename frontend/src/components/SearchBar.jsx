import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { alpha, useTheme } from "@mui/material/styles";

export default function SearchBar({ value, onChange, onKeyDown, onClear }) {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      placeholder="Type an ingredient..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "primary.main", fontSize: 20 }} />
          </InputAdornment>
        ),
        // Clear (✕) button — only shows when there's a value, matches Figma
        endAdornment: value ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={onClear} edge="end">
              <CloseIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          backgroundColor: "textField.bgColor",
          borderRadius: "50px",
          "& fieldset": { borderColor: "transparent" },
          "&:hover fieldset": {
            borderColor: alpha(theme.palette.primary.main, 0.3),
          },
          "&.Mui-focused fieldset": { borderColor: "primary.main" },
        },
      }}
    />
  );
}
