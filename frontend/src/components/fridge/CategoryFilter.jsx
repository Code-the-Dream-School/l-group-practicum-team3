import { Stack, Chip } from "@mui/material";

const CATEGORIES = ["All Items", "Produce", "Dairy", "Grains", "Proteins"];

export default function CategoryFilter({selectedCategory, setSelectedCategory}) {
  return (
    <Stack 
        direction="row" 
        spacing={1} 
        mt={3} 
        sx={{overflowX: "auto", pb: 1,}}
    >
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