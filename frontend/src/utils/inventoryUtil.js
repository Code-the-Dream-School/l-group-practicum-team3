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

export const calculateExpiryDays = (expirationDate) => {
  if (!expirationDate) return 0;

  const today = new Date();
  const expiry = new Date(expirationDate);
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
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
