import { alpha } from "@mui/material/styles";
import { Leaf, Egg, Beef, Wheat, Coffee, Utensils } from "lucide-react";

export const categoryIcons = {
  produce: Leaf,
  dairy: Egg,
  proteins: Beef,
  grains: Wheat,
  beverages: Coffee,
  default: Utensils,
};

export const getExpiryStyle = (days) => {
  if (days === null) {
    return {
      bg: "#A3F69C",
      text: "#005312",
    };
  } else if (days <= 2) {
    return {
      bg: alpha("#BA1A1A", 0.1),
      text: "#BA1A1A",
    };
  } else if (days <= 5) {
    return {
      bg: alpha("#FDD34D", 0.5),
      text: "secondary.contrastText",
    };
  }
  return {
    bg: "#A3F69C",
    text: "#005312",
  };
};

// get Expiring Items for Receipes recommendations
// daysLeft = Number used to find items has less than chosed days life
export const getExpiringItemsForReceipes = (items, daysLeft = 3) => {
  if (!items || items.length === 0) return "";

  const expiringSoonItems = items.filter((item) => item.expiryDays <= daysLeft);

  const targetedItems =
    expiringSoonItems.length > 0 ? expiringSoonItems : items.slice(0, 3);

  const searchedItems = targetedItems
    .map((item) => item.name.toLowerCase().trim())
    .join(",");

  return searchedItems;
};
