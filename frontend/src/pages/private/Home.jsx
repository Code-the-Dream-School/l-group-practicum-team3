import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import RecipeCard from "../../components/home/RecipeCard";
import SectionHeading from "../../components/home/SectionHeading";
import ActionButton from "../../components/home/ActionButton";
import Greeting from "../../components/home/Greeting";
import ExpiringItemCard from "../../components/home/ExpiringItemCard";
import AppLogo from "../../components/AppLogo";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../../utils/axios";
import Alert from "@mui/material/Alert";
import {
  calculateExpiryDays,
  getExpiringItemsForReceipes,
} from "../../utils/inventoryUtil";
import OpenSpeedDial from "../../components/home/OpenSpeedDial";
import Loading from "../../components/Loading";

function Home() {
  const { user } = UserAuth();
  const name = user?.user_metadata?.display_name || "Chef";

  const [itemlist, setItemList] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchHomepageData = async () => {
      setError("");
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const expiringItemsResult = await api.get("/api/grocery?limit=9", {
          headers,
        });

        // expiring items
        const items = expiringItemsResult.data.data;
        if (items) {
          const finalizedItems = items.map((item) => ({
            ...item,
            expiryDays: calculateExpiryDays(item.expiry_date),
          }));

          finalizedItems.sort((a, b) => a.expiryDays - b.expiryDays);

          setItemList(finalizedItems);

          // receipe fetching based on expiring items
          const searchQuery = getExpiringItemsForReceipes(finalizedItems, 3);

          if (searchQuery) {
            const recipesResult = await api.get(
              `/api/recipes/search?ingredients=${searchQuery}&number=10`,
              {
                headers,
              },
            );

            console.log("recipesResult", recipesResult);

            const receipesList = recipesResult.data?.recipes;
            console.log("recipesList", receipesList);
            setRecipes(receipesList);
          }
        }
      } catch (error) {
        console.log(error);
        setError(
          error.response?.data?.message ||
            "Failed To Load Data. Please Try again",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container
      maxWidth={{ xs: "xs", md: "lg" }}
      sx={{ px: { xs: 3, md: 5 }, py: { xs: 2, md: 4 }, position: "relative" }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <AppLogo />
      <Greeting name={name} />

      {/* Expiring Soon section */}
      <Box sx={{ mt: 2 }}>
        <SectionHeading
          title="Expiring Soon"
          actionText="View All"
          onClick={() => navigate("/fridge")}
        />
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: 2,
            overflowX: "auto",
            width: "100%",
            pb: 2,
            px: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {itemlist.map((item, index) => (
            <ExpiringItemCard
              key={index}
              name={item.name}
              category={item.category}
              daysLeft={item.expiryDays}
            />
          ))}
        </Box>
      </Box>

      {/* Button Group */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },

          mt: 3,
          width: "100%",
          gap: { xs: 2, md: 4 },
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <ActionButton
          onClick={() => navigate("/scan")}
          bgColor="primary.dark"
          textColor="primary.contrastText"
          startIcon={<DocumentScannerIcon />}
        >
          Scan Receipt
        </ActionButton>
        <ActionButton
          onClick={() => navigate("/add-items")}
          bgColor="secondary.main"
          textColor="secondary.contrastText"
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          Add Item
        </ActionButton>
      </Box>

      {/* Recipes section */}
      <Box sx={{ mt: 2, mb: 2, pb: "100px", overflowY: "auto" }}>
        <SectionHeading
          title="Recommended Recipes"
          actionText="Explore"
          onClick={() => navigate("/recipes")}
        />
        <Stack spacing={2} direction="row">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              name={recipe.title}
              imgLink={recipe.image}
              ingredient={recipe.usedIngredients[0]}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <OpenSpeedDial />
      </Box>
    </Container>
  );
}

export default Home;
