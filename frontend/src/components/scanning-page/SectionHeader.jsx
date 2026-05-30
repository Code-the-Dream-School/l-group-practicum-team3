import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export default function SectionHeader() {
  return (
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "12px",
            color:'secondary.contrastText',
            letterSpacing:'1.2px'
          }}
        >
          INVENTORY RECOGNITION
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "26px",
          }}
        >
          Detected Items
        </Typography>
      </Box>
      <Button startIcon={<AddCircleOutlineOutlinedIcon />}>
        Manual Entry
      </Button>
    </Box>
  );
}
