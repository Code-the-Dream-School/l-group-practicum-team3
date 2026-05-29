import { useState, useEffect } from "react";
import { Box, Typography, Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppLogo from "../../components/AppLogo"
import AddItemForm from "../../components/shoppingList/AddItemForm";
import ShoppingItemCard from "../../components/shoppingList/ShoppingItemCard";

function ShoppingList() {
  const [showForm, setShowForm] = useState(false);

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shoppingItems");
    return savedItems ? JSON.parse(savedItems) : [
      {
        id: 1,
        name: "Hass Avocados",
        quantity: "3 pieces",
        category: "Produce",
        completed: false,
      },
      {
        id: 2,
        name: "Whole Greek Yogurt",
        quantity: "500g",
        category: "Dairy",
        completed: false,
      },
      {
        id: 3,
        name: "Sourdough Loaf",
        quantity: "1 unit",
        category: "Bakery",
        completed: true,
      },
      ];
  });

  const addItem = (newItem) => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newItem,
      },
    ]);
  };

  const toggleCompleted = (id) => {
    setItems((prev) => 
      prev.map((item) => 
        item.id === id ? {...item, completed: !item.completed} : item
      )
    )
  };

  const deleteItem = (id) => {
    setItems((prevItems) =>
      prevItems.filter(item => item.id !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "shoppingItems",
      JSON.stringify(items)
    );
  }, [items]);

  return (
    <Box sx={{p: 2, pb: 10, width: "100%", bgcolor: "background.default", minHeight: "100vh",}}>
        <AppLogo />
        <Box
          sx={{ maxWidth: 430, mx: "auto",}}
        >
          <Stack spacing={4}>
            <Box>
              <Typography
                sx={{ fontSize: "2rem", fontWeight: 400, color: "primary.dark", mb: 2, }}
              >
                Shopping List
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ fontSize: "1rem", lineHeight: 1.1, }}
              >  
                Gathering the freshest ingredients for your weekly harvest.
              </Typography>
            </Box>

            { /* Add Item Section */ }
            {!showForm ? (
              <Box
                sx={{ 
                  bgcolor: "neutral.light",
                  borderRadius: "999px", 
                  padding: 1,                 
                  display: "flex", 
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    pl: 3,
                    color: "neutral.dark",
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                >
                  Add an item...
                </Typography>
                <Fab
                  onClick={() => setShowForm(true)}
                  sx={{
                    width: 45,
                    height: 45,
                    boxShadow: "none",
                    bgcolor: "primary.main",
                    color: "common.white",
                    transition: "all 0.2s ease",

                    "&:hover": {
                      bgcolor: "primary.dark",
                      transform: "scale(1.05)",
                      boxShadow: 3,
                    }                     
                  }}
                >
                  <AddIcon sx={{ fontSize: 28 }} />
                </Fab>
              </Box>
              ) : ( <AddItemForm onClose={() => setShowForm(false)} onSave={addItem} /> )
            }

            {/* Shopping Items */}
            <Stack spacing={3}>
              {
                items.map((item) => (
                  <ShoppingItemCard  key={item.id} item={item} onToggle={toggleCompleted} onDelete={deleteItem} />
                ))
              }
            </Stack>
          </Stack>
        </Box>
    </Box>     
  );
}

export default ShoppingList;