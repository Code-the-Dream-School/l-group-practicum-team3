import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function RecipeCard() {
  return (
    <Card
      sx={{
        width: 240,
        borderRadius: 5,
        backgroundColor: "transparent", // Let the container background show through
        position: "relative",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          image="https://www.themealdb.com/images/media/meals/1549542994.jpg"
          alt=""
          sx={{ borderRadius: 5, objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Salmon Avocado salad
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Uses your fredh salmon
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
