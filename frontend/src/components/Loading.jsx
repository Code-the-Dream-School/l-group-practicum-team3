import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Loading() {
  return (
    <Stack
      spacing={1}
      sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Skeleton variant="text" sx={{ fontSize: { xs: '5rem', md: '10rem'}, width: "40%" }} />

      <Skeleton
        variant="rounded"
        width="80%"
        sx={{ height: { xs: 120, md: 260 } }}
      />
      <Skeleton
        variant="rounded"
        width="80%"
        sx={{ height: { xs: 120, md: 260 } }}
      />
         <Skeleton
        variant="rounded"
        width="80%"
        sx={{ height: { xs: 120, md: 260 }, display: { xs: "flex", md: "none" }  }}
      />
    
    </Stack>
  );
}
