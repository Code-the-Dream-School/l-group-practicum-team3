import { useState } from "react";
import EditItemModal from "./EditItemModal.jsx";
import {
  Box,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { Leaf, Milk, Beef, CirclePile, Package } from "lucide-react";
import { getExpiryStyle } from "../../utils/inventoryUtil.js";
import { getExpiryMessage } from "../../utils/dateHelper.js";

const categoryIcons = {
  produce: <Leaf size={20} color="currentColor" />,
  dairy: <Milk size={20} color="currentColor" />,
  meat: <Beef size={20} color="currentColor" />,
  pantry: <CirclePile size={20} color="currentColor" />,
  other: <Package size={20} color="currentColor" />,
};

export default function ItemCard({ item, onDelete, onRestock, onItemSaved }) {
  const [editOpen, setEditOpen] = useState(false);
  const dayStatusStyle = getExpiryStyle(item.remainingDays);
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "24px",
        bgcolor: "background.paper",
        boxShadow: "none",
        p: 2,
        height: "100%",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          p: 0,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          "&:last-child": {
            pb: 0,
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            {/*Icon circle*/}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "secondary.main",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {categoryIcons[item.category?.toLowerCase()] || (
                <CirclePile size={20} color="currentColor" />
              )}
            </Box>

            {/* Days*/}
            <Box
              sx={{
                position: "absolute",
                right: 16,
                bgcolor: dayStatusStyle.bg,
                color: dayStatusStyle.text,
                px: 1.2,
                py: 0.6,
                borderRadius: "999px",
                fontSize: 10,
                lineHeight: 1.4,
                fontWeight: 600,
              }}
            >
              {getExpiryMessage(item.remainingDays)}
            </Box>
          </Stack>

          {/*Category */}
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: 1,
              color: "neutral.dark",
              textTransform: "uppercase",
              mt: 3,
            }}
          >
            {item.category}
          </Typography>

          {/* Name */}

          <Typography
            sx={{
              fontSize: {
                xs: 16,
                sm: 18,
                md: 20,
              },
              fontWeight: 700,
              color: "primary.main",
              mt: 0.5,
            }}
          >
            {item.name}
          </Typography>

          {/* Quantity */}
          <Typography
            sx={{
              fontSize: 12,
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            {item.quantity} {item.unit}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction="row"
          sx={{ alignItems: "center", width: "100%", mt: "auto" }}
          spacing={{ xs: 0.5, sm: 0.8 }}
        >
          <IconButton
            onClick={() => setEditOpen(true)}
            sx={{
              bgcolor: "neutral.light",
              color: "primary.main",
              borderRadius: "999px",
              flexShrink: 0,
              width: { xs: 26, sm: 32, md: 36 },
              height: { xs: 26, sm: 32, md: 36 },
            }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <EditItemModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            item={item}
            onSuccess={(updated) => {
              setEditOpen(false);
              if (onItemSaved) onItemSaved(updated);
            }}
          />

          <Button
            onClick={() => onRestock(item)}
            sx={{
              bgcolor: "action.restock",
              color: "primary.main",
              fontWeight: 700,
              borderRadius: "999px",
              flexGrow: 1,
              minWidth: 0,
              fontSize: { xs: 8, sm: 10, md: 11 },
              letterSpacing: { xs: 0, sm: 0.5, md: 1 },
              py: { xs: 0.4, sm: 0.7, md: 1 },
              px: { xs: 0.6, sm: 1.2, md: 1.5 },
              mx: { xs: 0, sm: 0.8, md: 1.8 },
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",

              "& .MuiButton-label, & span": {
                width: "100%",
                display: "block",
              },

              "&:hover": {
                bgcolor: "action.restockHover",
              },
            }}
          >
            RESTOCK
          </Button>

          <IconButton
            onClick={() => onDelete(item.grocery_id)}
            sx={{
              bgcolor: "neutral.light",
              color: "primary.main",
              flexShrink: 0,
              borderRadius: "999px",
              width: { xs: 26, sm: 32, md: 36 },
              height: { xs: 26, sm: 32, md: 36 },
            }}
          >
            <CheckIcon fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
