import { useState, useEffect } from "react";
import { Box, Typography, Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AppLogo from "../../components/AppLogo"
import AddItemForm from "../../components/shoppingList/AddItemForm";
import ShoppingItemCard from "../../components/shoppingList/ShoppingItemCard";
import api from "../../utils/axios";

function ShoppingList() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch wishList items
  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(
          "/api/wishlist?page=1&limit=10",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mappedItems = response.data.data.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          category: item.category,
          completed: false,
        }));

        setItems(mappedItems);
      } catch (error) {
        console.log("Failed to fetch wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishList();
  }, []);

  console.log("item:", items)
  
  const addItem = async (newItem) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/api/wishlist",
        {
          name: newItem.name,
          quantity: newItem.quantity,
          unit: newItem.unit,
          category: newItem.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const savedItem = response.data.data;
      setItems(prev => [
        ...prev,
        {
          id: savedItem.id,
          name: savedItem.name,
          quantity: savedItem.quantity,
          unit: savedItem.unit,
          completed: false,
        },
      ]);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const toggleCompleted = (id) => {
    setItems((prev) => 
      prev.map((item) => 
        item.id === id ? {...item, completed: !item.completed} : item
      )
    )
  };

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/api/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(prevItems =>
        prevItems.filter(item => item.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  if (loading) {
    return <Typography>Loading ...</Typography>
  }
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
                  <ShoppingItemCard  
                    key={item.id} 
                    item={item} 
                    onToggle={toggleCompleted} 
                    onDelete={deleteItem} 
                  />
                ))
              }
            </Stack>
          </Stack>
        </Box>
    </Box>     
  );
}

export default ShoppingList;