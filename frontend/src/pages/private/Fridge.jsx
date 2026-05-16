import { useState } from "react";
import { Box, Typography, Grid, Fab, Tooltip, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AppLogo from "../../components/AppLogo";
import SearchBar from "../../components/fridge/SearchBar";
import CategoryFilter from "../../components/fridge/CategoryFilter";
import ItemCard from "../../components/fridge/ItemCard";

const data = {
    "date": "06/01/2016",
    "items": [
        {
            "name": "Zucchini",
            "category": "produce",
            "quantity": 0.778,
            "unit": "kg",
            "price": 4.66
        },
        {
            "name": "Chicken",
            "category": "proteins",
            "quantity": 0.500,
            "unit": "kg",
            "price": 10.25
        },
        {
            "name": "Cheese",
            "category": "dairy",
            "quantity": 0.5,
            "unit": "kg",
            "price": 4.66
        },
        {
            "name": "milk",
            "category": "dairy",
            "quantity": 0.778,
            "unit": "2l",
            "price": 4.66
        },
        {
            "name": "apple",
            "category": "produce",
            "quantity": 0.500,
            "unit": "kg",
            "price": 10.25
        },
        {
            "name": "rice",
            "category": "grains",
            "quantity": 0.5,
            "unit": "kg",
            "price": 4.66
        },
        
    ],
    "subtotal": 24.2,
    "total": 24.2
}

const items = data.items;

function Header() {
  return (
    <Box>
      <Typography sx={{color: "primary.dark"}} variant="h4" fontWeight={800}>Inventory</Typography>
      <Typography color="text.secondary" mt={1}>Keep track of your fresh ingredients and pantry staples.</Typography>
    </Box>
  )
}

export default function Fridge() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [search, setSearch] = useState("");

  const items = data?.items || [];
  const searchTerm = search.trim().toLowerCase();

  const filteredItems = items.filter(item => {
    if (searchTerm) {
      return item.name.toLowerCase().includes(searchTerm);
    };

    return (
      selectedCategory === "All Items" || item.category.toLowerCase() === selectedCategory.toLowerCase()
    )
  });

  return (
    <Box sx={{p: 2, pb: 10, width: "100%", bgcolor: "background.default", minHeight: "100vh",}}>
      <AppLogo />
      <Header />

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Grid container spacing={2} alignItems="stretch">
        {
          filteredItems.map((item, index) => (
            <Grid 
              size={{
                xs: 6,
                sm: 4,
                md: 3,
                lg: 2,
              }} 
              key={index}
            >
              <ItemCard item={item} />
            </Grid>
          ))
        }

        {/* Add Item Card */}

        <Grid
          size={{
            xs: 6,
            sm: 4,
            md: 3,
            lg: 2,
          }}
        >
          <Card
            sx={{
              height: "100%",
              minHeight: 160,
              bgcolor: "background.default",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px dashed",
              borderColor: "neutral.main",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                
              }
            }}
          >
            <Box sx={{textAlign: "center"}}>
              <AddIcon sx={{fontSize: 40, color: "primary.dark",}} />
              <Typography sx={{mt: 1, color: "primary.dark", fontSize: 20, fontWeight: "bold"}}>
                Add Item
              </Typography>
            </Box>

          </Card>
        </Grid>

        {
          filteredItems.length === 0 && (
            <Box mt={4} width="100%" sx={{textAlign: "center"}}>
              <Typography color="text.secondary">
                No items found
              </Typography>
            </Box>
          )
        }
      </Grid>

      <Tooltip title="Add Item" arrow>
      <Fab
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
          bgcolor: "secondary.main",
        }}
        color="secondary"
      >
        <AddIcon />
      </Fab>
      </Tooltip>

    </Box>
  )
}

