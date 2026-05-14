import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import RestaurantIcon from "@mui/icons-material/Restaurant";

export default function Greeting({ name }) {
  return (
    <Paper
      elevation={0}
      sx={{
        background:
          "linear-gradient(90deg, rgba(0, 73, 14, 0.1) 0%, #FBF9F2 50%, rgba(253, 211, 77, 0.2) 100%)",
        padding: 3,
        borderRadius: 4,
        mt: "50px",
        position: "relative",
        overflow: "hidden",
        minHeight: "140px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, fontSize: 30, color: "primary.dark" }}
      >
        Welcome back, <br /> {name}
       
      </Typography>
      <RestaurantIcon
        sx={{
          fontSize: "80px",
          color: "#00490E",
          opacity: 0.1,
          position: "absolute",
          right: 10,
          bottom: 10,
          transform: "rotate(15deg)",
          zIndex: 1,
        }}
      />
    </Paper>
  );
}
