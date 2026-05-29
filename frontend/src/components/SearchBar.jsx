import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

export default function SearchBar({ value, onChange, onKeyDown }) {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      placeholder="Type an ingredient..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      slotProps={{
        input: {
          startAdornment: (
            <SearchIcon sx={{ color: "primary.main", fontSize: 20 }} />
          ),
        },
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
