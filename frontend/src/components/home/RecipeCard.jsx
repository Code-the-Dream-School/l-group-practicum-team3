import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function RecipeCard({ name, imgLink, category }) {
  return (
    <Card
      sx={{
        width: 200,
        borderRadius: 5,
        backgroundColor: "transparent",
        flexShrink: 0,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={imgLink}
          alt="Salmon Avocado salad"
          sx={{
            height: "130px",
            width: "100%",
            borderRadius: 5,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ fontWeight: 700, fontSize: 14 }}
          >
            {name}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Chip
              label={category}
              variant="outlined"
              sx={{
                backgroundColor: "#FFFAEB",
                color: "text.secondary",
              }}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
