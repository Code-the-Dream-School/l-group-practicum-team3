import { Box, Typography, Stack, Grid, Card, CardContent, IconButton, Button, } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import { Leaf, Egg, Beef, Wheat } from "lucide-react"

const categoryIcons = {
  produce: <Leaf size={20} color="currentColor" />,
  dairy: <Egg size={20} color="currentColor" />,
  proteins: <Beef size={20} color="currentColor" />,
  grains: <Wheat size={20} color="currentColor" />
};

export default function ItemCard({item}) {
  return (
    <Card 
      sx={{
        position: "relative",
        borderRadius: "24px",
        bgcolor: "background.paper",
        boxShadow: "none",
        p: 2,
      }}
    >
      <CardContent 
        sx={{
          p: 0,
          "&:last-child": {
            pb: 0,
          }
          }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
        
        {/*Icon circle*/}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {categoryIcons[item.category]}
        </Box>

        {/* Days*/}
        <Box
          sx={{
            position: "absolute",
            right: 16,
            bgcolor: "#E0DED7",
            px: 1.2,
            py: 0.3,
            borderRadius: "999px",
            fontSize: 10,
            lineHeight: 1.2,
            fontWeight: 600,
          }}
        >
          5 DAYS
        </Box>
        </Stack>

        {/*Category */}
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: 1,
            color: "#40493D",
            textTransform: "uppercase",
            mt: 3,
          }}
        >
          {item.category}  
        </Typography>

        {/* Name */}

        <Typography 
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: "primary.main",
            mt: 0.5,
          }}
        >
          {item.name}
        </Typography>

        {/* Quantity */}  
        <Typography
          sx={{
            fontSize: 12,
            color: "text.secondary",
            mt: 0.5,
          }}
        >
          {item.quantity} {item.unit}
        </Typography>

        {/* Actions */}  
        <Stack
          direction="row"  
          alignItems= "center"  
          spacing={1.5}
          mt={1.5}        
        >
          <IconButton
            sx={{
              bgcolor: "#EAE8E2",
              px: 0.8,
              height: 36,
              borderRadius: "999px"
            }}
          >
            <EditIcon fontSize="small"/>
          </IconButton>

          <Button 
            sx={{
              bgcolor: "#CFEBDD",
              color: "#0D631B",
              fontWeight: 700,
              fontSize: {
                xs: 10,
                sm: 12,
              },
              letterSpacing: 2,
              borderRadius: "999px",
              px: 3,
              "&:hover": {
                bgcolor: "#BEE3CF"
              },
            }}
          >
            RESTOCK
          </Button>

          <IconButton
            sx={{
              bgcolor: "#EAE8E2",
              px: 0.8,
              height: 36,
              borderRadius: "999px"
            }}
          >
            <CheckIcon  fontSize="small" />
          </IconButton>

        </Stack>  
      </CardContent>
    </Card>
  )
}