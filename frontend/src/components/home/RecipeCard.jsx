import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";

export default function RecipeCard({ name, imgLink, ingredient }) {
  // add a backup image to handle image not exist
  const imageBackUp = 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop'

  const [currentImage, setCurrentImage] = useState(imgLink || imageBackUp)  

  return (
    <Card
      sx={{
        width:{ xs: "200px", md: "300px" },
        borderRadius: 5,
        backgroundColor: "transparent",
        flexShrink: 0,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={currentImage}
          onError={()=> {
            if(currentImage !==imageBackUp){
              setCurrentImage(imageBackUp)
            }
          }}
          alt={name}
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
              label={ingredient}
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
