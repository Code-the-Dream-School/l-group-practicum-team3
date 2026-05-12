import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import React from "react";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export default function ItemCard() {
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
          sx={{ width: 56, height: 56, bgcolor: "#FDEEEE", color: "#AF1D1D" }}
        >
          <EnergySavingsLeafOutlinedIcon />
        </Avatar>
        <Typography sx={{ fontWeight: 800 }}>Greek Yogurt</Typography>
      </Stack>

      <Chip
        label="5 DAYS LEFT"
        sx={{
          backgroundColor: "#FDEEEE",
          color: "#AF1D1D",
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
