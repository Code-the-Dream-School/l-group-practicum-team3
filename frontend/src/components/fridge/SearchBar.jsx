import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({search, setSearch}) {
  return (
    <Box sx={{mt: 1, mb: 1, maxWidth: 500}}>
    <TextField 
      fullWidth
      placeholder="Search items..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{
        mt: 1,
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "999px",
          bgcolor: "#EFEDE7"
        }
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }
      }}
    />
    </Box>    
  )
}