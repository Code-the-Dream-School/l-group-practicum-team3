import { useState } from "react";
import { Box, Typography, TextField, InputAdornment, Chip,
  Stack, Grid, Card, CardContent, IconButton, Button, Fab } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { Leaf, Egg, Beef, Wheat } from "lucide-react"

const categoryIcons = {
  produce: <Leaf size={20} color="#0D631B" />,
  dairy: <Egg size={20} color="#0D631B" />,
  proteins: <Beef size={20} color="#0D631B" />,
  grains: <Wheat size={20} color="#0D631B" />
};

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

function CategoryFilter({selectedCategory, setSelectedCategory}) {
  return (
    <Stack direction="row" spacing={1} mt={3} sx={{overflowX: "auto", pb: 1,}}>
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
    <Card 
      sx={{
        position: "relative",
        borderRadius: "24px",
        bgcolor: "#FFFFFF",
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
            bgcolor: "#FDD34D",
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
            color: "#0D631B",
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
              fontSize: 12,
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

      <Grid container spacing={2} alignItems="strech">
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
          bottom: 80,
          right: 16,
          bgcolor: "#FDD34D",
          color: "#000"
        }}
        color="secondary"
      >
        <AddIcon />
      </Fab>

    </Box>
  )
}

