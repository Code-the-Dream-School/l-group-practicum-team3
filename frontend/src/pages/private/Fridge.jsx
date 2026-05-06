import { useState } from "react";
import { Box, Typography, TextField, InputAdornment, Chip,
  Stack, Grid, Card, CardContent, IconButton, Button, Fab } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";

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
            "category": "Dairy",
            "quantity": 0.778,
            "unit": "2l",
            "price": 4.66
        },
        {
            "name": "apple",
            "category": "Produce",
            "quantity": 0.500,
            "unit": "kg",
            "price": 10.25
        },
        {
            "name": "rice",
            "category": "Grains",
            "quantity": 0.5,
            "unit": "kg",
            "price": 4.66
        },
        
    ],
    "subtotal": 24.2,
    "total": 24.2
}

const items = data.items;

const CATEGORIES = ["All Items", "Produce", "Dairy", "Grains", "Proteins"]

function Header() {
  return (
    <Box>
      <Typography variant="h3" fontWeight={800}>Inventory</Typography>
      <Typography color="text.secondary" mt={1}>Keep track of your fresh ingredients and pantry staples.</Typography>
    </Box>
  )
}

function SearchBar({search, setSearch}) {
  return (
    <TextField 
      fullWidth
      placeholder="Search items..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{mt: 3}}
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
  )
}

function CategoryFilter({selectedCategory, setSelectedCategory}) {
  return (
    <Stack direction="row" spacing={1} mt={3} sx={{flexWrap: "wrap"}}>
      {CATEGORIES.map(cat => (
        <Chip 
          key={cat}
          label={cat}
          onClick={() => setSelectedCategory(cat)}
          color={selectedCategory === cat? "success" : "default"}
        />
      ))}
    </Stack>
  )
}

function ItemCard({item}) {
  return (
    <Card sx={{width: "100%", height: "100%"}}>
      <CardContent>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{textTransform: "uppercase"}}
        >
          {item.category}  
        </Typography>

        <Typography variant="h6" fontWeight={700}>
          {item.name}
        </Typography>

        <Typography>
          {item.quantity} {item.unit}
        </Typography>

        <Stack
          direction="row"  
          sx={{
            justifyContent: "space-between",
            alignItems: "center" 
          }}  
          mt={2}        
        >
          <IconButton>
            <EditIcon />
          </IconButton>

          <Button 
            variant="contained"
            sx={{
              backgroundColor: "#D1FAE5",
              color: "#065f46",
              fontWeight: 700,
              letterSpacing: 2,
              borderRadius: "999px",
              px: 3,
              "&:hover": {
                backgroundColor: "#BEE9D3"
              },
            }}
          >
            Restock
          </Button>

          <IconButton>
            <CheckIcon />
          </IconButton>

        </Stack>
      </CardContent>
    </Card>
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
    <Box sx={{p: 2, pb: 10, width: "100%"}}>
      <Header />

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Grid container spacing={2}>
        {
          filteredItems.map((item, index) => (
            <Grid item xs={6} key={index}>
              <ItemCard item={item} />
            </Grid>
          ))
        }
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

      <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16
        }}
        color="secondary"
      >
        <AddIcon />
      </Fab>

    </Box>
  )
}

