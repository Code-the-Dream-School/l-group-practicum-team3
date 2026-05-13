import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import React from "react";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { categoryIcons, getExpiryStyle } from "../../utils/inventoryUtil";

export default function ExpiringItemCard({name, category, daysLeft}) {
  const style = getExpiryStyle(daysLeft);
  const IconComponent  = categoryIcons[category.toLowerCase()] || categoryIcons.default;

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);


  return (
    <Paper
      elevation={0}
      sx={{
        display:'flex',
        flexDirection: 'row', 
        justifyContent: "space-between",
        backgroundColor: "background.paper",
        p:2,
        height: "90px",
        borderRadius: 4,
        alignItems: "center",
        width:'350px'
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          padding: "16px",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ width: 56, height: 56, bgcolor: style.bg, color: style.text }}
        >
        <IconComponent />
        </Avatar>
        <Typography sx={{ fontWeight: 800 }}>{capitalizedName}</Typography>
      </Stack>

      <Chip
        label={`${daysLeft} ${daysLeft === 1 ? 'DAY' : 'DAYS'} LEFT`}
        sx={{
          backgroundColor:style.bg,
          color: style.text,
          fontWeight: 600,
          fontSize: "10px",
          borderRadius: "12px",
          width: "92px",
          height: "24px",
          border: "none",
          letterSpacing: "1px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "& .MuiChip-label": {
            width: "100%",
            textAlign: "center",
            padding: 0,
            lineHeight: 1,
          },
        }}
      />
    </Paper>
  );
}
