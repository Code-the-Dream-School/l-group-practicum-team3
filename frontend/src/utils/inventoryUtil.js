import { Leaf, Egg, Beef, Wheat, Coffee, Utensils } from "lucide-react"

export const categoryIcons = {
  produce: Leaf ,
  dairy: Egg,
  proteins: Beef,
  grains: Wheat,
  beverages: Coffee,
  default: Utensils
};


export const getExpiryStyle = (days) => {
  if (days <= 2) {
    return {
      bg: "#FFDAD6",   
      text: "#BA1A1A", 
    };
  } else if (days <= 5) {
    return {
      bg: "secondary.main",  
      text: "secondary.contrastText", 
    };
  }
  return {
    bg: "#A3F69C",     
    text: "#005312",   
  };
};

// bgcolor: "#FDEEEE", color: "#AF1D1D"