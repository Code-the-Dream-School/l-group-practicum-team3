import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ItemCard from "../../components/home/ItemCard";
import RecipeCard from "../../components/home/RecipeCard";
import SectionHeading from "../../components/home/SectionHeading";
import ActionButton from "../../components/home/ActionButton";
import Greeting from "../../components/home/Greeting";

import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

function Home() {
  const name = "Tina";

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
        <Stack spacing={2}>
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </Stack>
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
      <Box sx={{ mt: 2 }}>
        <SectionHeading
          title="Recommended Recipes"
          actionText="Explore"
          onClick={() => navigate("/recipes")}
        />
        <Stack spacing={2}>
          <RecipeCard />
        </Stack>
      </Box>
    </Container>
  );
}

export default Home;
