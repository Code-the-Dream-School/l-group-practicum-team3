import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

function SectionHeading({ title, actionText, onClick }) {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ justifyContent: "space-between", padding: 1 }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, fontSize: 24, color: "primary.dark" }}
      >
        {title}
      </Typography>
      <Button endIcon={<ArrowForwardOutlinedIcon />} onClick={onClick}>
        {actionText}
      </Button>
    </Stack>
  );
}

export default SectionHeading;
