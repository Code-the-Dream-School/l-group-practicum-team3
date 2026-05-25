import { useState, useEffect } from "react";
import { Box, Typography, Grid, Fab, Tooltip, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AppLogo from "../../components/AppLogo";
import SearchBar from "../../components/fridge/SearchBar";
import CategoryFilter from "../../components/fridge/CategoryFilter";
import ItemCard from "../../components/fridge/ItemCard";
import api from "../../utils/axios";

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

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeCategory = (category) => {
    switch (category.toLowerCase()) {
      case "fruit":
        return "Produce";
      case "vegetable":
        return "Produce";
      case "dairy":
        return "Dairy";
      case "grain":
        return "Grains";
      case "protein":
        return "Proteins";
      case "meat":
        return "Proteins";
      default:
        return category;
    }
  };

  const searchTerm = search.trim().toLowerCase();

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const result = await api.get("/api/grocery?page=1&limit=20", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(
          (result.data.data || []).map(item => ({
            ...item,
            category: normalizeCategory(item.category),
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };
    

    fetchGroceries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/grocery/${id}`, {
        headers: {
          Authorization:`Bearer ${token}`,
        }
      });

      //update UI
      setItems(prev =>
        prev.filter(item => item.grocery_id !== id)
      )
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete item");
    }
  };

  if (loading) {
    return (
      <Box p={2}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  } 

  //Filter based on search text and selected category
    const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "All Items" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  //Expiry calculation
  const getRemainingDays = (expiryDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0,0,0,0);

    const diff = expiry - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <Box sx={{p: 2, pb: 10, width: "100%", bgcolor: "background.default", minHeight: "100vh",}}>
      <AppLogo />
      <Header />

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
        {
          filteredItems.map((item) => (
            <Grid 
              size={{
                xs: 6,
                sm: 4,
                md: 3,
                lg: 2,
              }} 
              key={item.grocery_id}
            >
              <ItemCard 
                item={{
                  ...item,
                  remainingDays: getRemainingDays(item.expiry_date),
                }} 
              onDelete={handleDelete} 
            />
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
              transition: "transform 0.2s ease",
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

