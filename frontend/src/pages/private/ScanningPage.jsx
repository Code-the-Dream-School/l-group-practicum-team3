import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import ReceiptItem from "../../components/scanning-page/ReceiptItem";
import Camera from "../../components/scanning-page/Camera";
import SectionHeader from "../../components/scanning-page/SectionHeader";
import Nav from "../../components/scanning-page/Nav";

import { useRef, useState } from "react";

const data = {
  date: "06/01/2016",
  items: [
    {
      name: "Zucchini",
      category: "produce",

      price: 4.66,
      expiryDays: 6,
    },
    {
      name: "Chicken",
      category: "proteins",
      quantity: 1,
      unit: "kg",
      price: 10.25,
      expiryDays: 3,
    },
    {
      name: "Cheese",
      category: "dairy",
      quantity: 0.5,
      unit: "kg",
      price: 4.66,
      expiryDays: 0,
    },
    {
      name: "milk",
      category: "dairy",
      quantity: 0.778,
      unit: "ml",
      price: 4.66,
      expiryDays: 4,
    },
    {
      name: "apple",
      category: "produce",
      quantity: 0.5,
      unit: "kg",
      price: 10.25,
      expiryDays: 3,
    },
    {
      name: "rice",
      category: "grains",
      quantity: 0.5,
      unit: "kg",
      price: 4.66,
      expiryDays: 1,
    },
    {
      name: "apple",
      category: "produce",
      quantity: 0.5,
      unit: "kg",
      price: 10.25,
      expiryDays: 3,
    },
    {
      name: "rice",
      category: "grains",
      quantity: 0.5,
      unit: "kg",
      price: 4.66,
      expiryDays: 1,
    },
  ],
  subtotal: 24.2,
  total: 24.2,
};

export default function ScanningPage() {
  const [scannedItems, setScannedItems] = useState(data.items);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleUpdateQuantity = (indexToUpdate, action) => {
    setScannedItems((prevItem) =>
      prevItem.map((item, index) => {
        if (index === indexToUpdate) {
          const currentQty = item.quantity ? item.quantity : 1;

          const isWeightBased = item.unit;

          const step = isWeightBased ? 0.1 : 1;

          const newQty =
            action === "increment" ? currentQty + step : currentQty - step;

          return {
            ...item,
            quantity: Math.max(0, parseFloat(newQty.toFixed(3))),
          };
        }

        return item;
      }),
    );
  };

  const handleDeleteItem = (indexToDelete) => {
    setScannedItems((prevItems) =>
      prevItems.filter((item, index) => index !== indexToDelete),
    );
  };

  

  return (
    <Container>
      <Nav />

      <Camera
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        previewImage={previewImage}
      />
      <SectionHeader />

      <Grid container spacing={2} sx={{ mt: 2, pb: 4 }}>
        {scannedItems.map((item, index) => (
          <Grid size={6} key={index}>
            <ReceiptItem
              key={index}
              name={item.name}
              category={item.category}
              expiryDays={item.expiryDays}
              quantity={item.quantity}
              unit={item.unit}
              index={index}
              handleUpdateQuantity={handleUpdateQuantity}
              handleDeleteItem={handleDeleteItem}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
