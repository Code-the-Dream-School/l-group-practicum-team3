import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function ReceiptItem({
  name,
  category,
  expiryDays,
  quantity,
  handleUpdateQuantity,
  unit,
  index,
  handleDeleteItem,
}) {
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
        label={category}
        sx={{
          backgroundColor: "secondary.main",
          textTransform: "uppercase",
          fontWeight: 600,
          fontSize: "10px",
          borderRadius: "12px",
          width: "max-content",
          height: "20px",
        }}
      />
      <Typography sx={{ fontWeight: 600, fontSize: "20px" }}>{name}</Typography>

      {/* expiration date */}
      <Stack
        direction="row"
        sx={{
          backgroundColor: "#F5F4ED",
          borderRadius: "50px",
          alignItems: "center",
          gap: 1,
          width: "max-content",
          textTransform: "uppercase",
          px: 1.5,
          height: "26px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", color: "#735C00" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "10px" }}>
            <CalendarMonthIcon sx={{ fontSize: 14, mr: 0.5 }} /> Expires In
          </Typography>
        </Box>
        <Typography
          sx={{ color: "primary.main", fontWeight: 600, fontSize: "10px" }}
        >
          {expiryDays}
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
            height: "24px",
          }}
        >
          <IconButton
            sx={{ color: "primary.main", padding: "0" }}
            onClick={() => handleUpdateQuantity(index, "decrement")}
          >
            <RemoveIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <Typography
            sx={{
              fontSize: 13,
              px: 1,
              minWidth: "45px",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {quantity !== undefined
              ? quantity % 1 === 0
                ? quantity
                : quantity.toFixed(2)
              : 1}{" "}
            {unit ? unit : ""}
          </Typography>
          <IconButton
            sx={{ color: "primary.main", padding: "0" }}
            onClick={() => handleUpdateQuantity(index, "increment")}
          >
            <AddIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
        <IconButton
          color="primary.main"
          sx={{ color: "#A0A0A0", p: 0.5 }}
          onClick={() => handleDeleteItem(index)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}
