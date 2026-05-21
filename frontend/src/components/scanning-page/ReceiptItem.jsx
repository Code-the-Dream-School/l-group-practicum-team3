import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function ReceiptItem() {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
        backgroundColor: "background.paper",
        p: 2,
        borderRadius: 4,
      }}
    >
      <Chip
        label="Dairy"
        sx={{
          backgroundColor: "secondary.main",
          textTransform: "uppercase",
          fontWeight: 600,
          fontSize: "10px",
          borderRadius: "12px",
          padding: "10px 4px",
          width: "60px",
          height: "15px",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>
        Whole Organic Milk
      </Typography>

      {/* expiration date */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          backgroundColor: "#F5F4ED",
          borderRadius: "50px",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "max-content",
          textTransform: "uppercase",
          px: 1,
          py: 0,
        }}
      >
        <Typography
          sx={{ color: "#735C00", fontWeight: 600, fontSize: "10px" }}
        >
          <CalendarMonthIcon sx={{ fontSize: 20, mr: 0.5 }} /> Expires In
        </Typography>
        <Typography
          sx={{ color: "primary.main", fontWeight: 600, fontSize: "10px" }}
        >
          4
        </Typography>
        <Typography
          sx={{ color: "#735C00", fontWeight: 600, fontSize: "10px" }}
        >
          Days
        </Typography>
      </Stack>


      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            alignItems: "center",
            backgroundColor: "#F5F4ED",
            borderRadius: "50px",
            width: "max-content",
            px: 1,
            py: 0,
          }}
        >
          <IconButton sx={{ color: "primary.main", padding: "0" }}>
            <RemoveIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <Typography sx={{ fontSize: 13, px: 1 }}>5</Typography>
          <IconButton sx={{ color: "primary.main", padding: "0" }}>
            <AddIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
        <IconButton color="primary.main">
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}
