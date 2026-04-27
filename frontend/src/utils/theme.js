import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    common: {
      black: "#1B1C18",
    },
    primary: {
      light: "#707A6C",
      main: "#0D631B",
      dark: "#00490E",
    },
    secondary: {
      main: "#FDD34D",
      contrastText: "#725B00",
    },
    background: { 
        default: "#FBF9F2", paper: "#FFFFFF" 
    },
  },
  typography: {
    fontFamily: '"Epilogue", "Roboto", sans-serif',
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
