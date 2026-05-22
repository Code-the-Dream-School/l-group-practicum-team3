import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import ReceiptItem from "../../components/scanning-page/ReceiptItem";
import Camera from "../../components/scanning-page/Camera";
import SectionHeader from "../../components/scanning-page/SectionHeader";
import Nav from "../../components/scanning-page/Nav";

import { useRef, useState } from "react";
import api from "../../utils/axios";
import Button from "@mui/material/Button";

export default function ScanningPage() {
  const [scannedItems, setScannedItems] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

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

  const handleScanReceipt = async () => {
    if (!previewImage) {
      alert("Please select or take a photo of a receipt first");
      return;
    }


    try {
      console.log('start')
      const formData = new FormData();

      const response = await fetch(previewImage);
      const blob = await response.blob();

      formData.append("file", blob, "receipt.jpg");

      const res = await api.post("/api/ai/scan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      
        const items = res.data.items;
        console.log(items);
        setScannedItems(items);
      
        console.log('end')
    } catch (error) {
      console.error("Error scanning receipt:", error);
      alert("Failed to read receipt. Is the backend server running?");
    }
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
      <Button onClick={handleScanReceipt}>Scan</Button>

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
