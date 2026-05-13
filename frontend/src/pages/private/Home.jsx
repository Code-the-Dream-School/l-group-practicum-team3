import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import RecipeCard from "../../components/home/RecipeCard";
import SectionHeading from "../../components/home/SectionHeading";
import ActionButton from "../../components/home/ActionButton";
import Greeting from "../../components/home/Greeting";
import ExpiringItemCard from "../../components/home/ExpiringItemCard";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

function Home() {
  const name = "Tina";

  const data = {
    date: "06/01/2016",
    items: [
      {
        name: "Zucchini",
        category: "produce",
        quantity: 0.778,
        unit: "kg",
        price: 4.66,
        expiryDays: 6,
      },
      {
        name: "Chicken",
        category: "proteins",
        quantity: 0.5,
        unit: "kg",
        price: 10.25,
        expiryDays: 3,
      },
      {
        name: "Cheese",
        category: "dairy",
        quantity: 0.5,
        unit: "kg",
        price: 4.66,
        expiryDays: 0,
      },
      {
        name: "milk",
        category: "dairy",
        quantity: 0.778,
        unit: "2l",
        price: 4.66,
        expiryDays: 4,
      },
      {
        name: "apple",
        category: "produce",
        quantity: 0.5,
        unit: "kg",
        price: 10.25,
        expiryDays: 3,
      },
      {
        name: "rice",
        category: "grains",
        quantity: 0.5,
        unit: "kg",
        price: 4.66,
        expiryDays: 1,
      },
      {
        name: "apple",
        category: "produce",
        quantity: 0.5,
        unit: "kg",
        price: 10.25,
        expiryDays: 3,
      },
      {
        name: "rice",
        category: "grains",
        quantity: 0.5,
        unit: "kg",
        price: 4.66,
        expiryDays: 1,
      },
    ],
    subtotal: 24.2,
    total: 24.2,
  };

  const recipeData = [
    {
      name: "Salmon Avocado salad",
      imgLink:"https://www.themealdb.com/images/media/meals/1549542994.jpg"
    },
  ];

  const navigate = useNavigate();

  return (
    <Container maxWidth="xs" sx={{ px: 3, py: 2 }}>
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
            pb: 2,
            px: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/*  need to update BE data here */}
          {data.items.map((item) => (
            <ExpiringItemCard
              key={item.name}
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
          display: "flex",
          gap: 5,
          mt: 3,
          width: "100%",
        }}
      >
        <ActionButton
          onClick={() => navigate("/add-items")}
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
          <RecipeCard />
          <RecipeCard />
        </Stack>
      </Box>
    </Container>
  );
}

export default Home;
