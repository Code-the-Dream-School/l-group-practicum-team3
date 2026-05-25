import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import ReceiptItem from "../../components/scanning-page/ReceiptItem";
import Camera from "../../components/scanning-page/Camera";
import SectionHeader from "../../components/scanning-page/SectionHeader";
import Nav from "../../components/scanning-page/Nav";
import { calculateExpiryDays } from "../../utils/dateHelper";
import api from "../../utils/axios";

import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const testData = [
  {
    name: "rice",
    category: "grains",
    quantity: 0.5,
    unit: "kg",
    price: 4.66,
    expirationDate: "2026-07-13",
    expiryDays: calculateExpiryDays("2026-07-13"),
  },
  {
    name: "apple",
    category: "produce",
    quantity: 0.5,
    unit: "kg",
    price: 10.25,
    expirationDate: "2026-07-13",
    expiryDays: calculateExpiryDays("2026-07-13"),
  },
  {
    name: "rice",
    category: "grains",
    quantity: 0.5,
    unit: "kg",
    price: 4.66,
    expirationDate: "2026-07-13",
  },
];

export default function ScanningPage() {
  const [scannedItems, setScannedItems] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

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

  const handleNameChange = (indexToUpdate, newName) => {
    const updatedItems = [...scannedItems];
    updatedItems[indexToUpdate].name = newName;
    setScannedItems(updatedItems);
  };

  const handleDateChange = (indexToUpdate, newDate) => {
    const updatedItems = [...scannedItems];
    updatedItems[indexToUpdate] = {
      ...updatedItems[indexToUpdate],
      expirationDate: newDate,
      expiryDays: calculateExpiryDays(newDate),
    };

    setScannedItems(updatedItems);
  };
  const handleDeleteItem = (indexToDelete) => {
    setScannedItems((prevItems) =>
      prevItems.filter((item, index) => index !== indexToDelete),
    );
  };

  const handleScanReceipt = async () => {
    if (!previewImage) {
      setError("Please select or take a photo of a receipt first");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      const response = await fetch(previewImage);
      const blob = await response.blob();

      formData.append("file", blob, "receipt.jpg");

      const res = await api.post("/api/ai/scan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const items = res.data?.items;
      // calculate the expiry days from expiration date
      if (items) {
        const finalizedItems = items.map((item) => ({
          ...item,
          expiryDays: calculateExpiryDays(item.expirationDate),
        }));
        setScannedItems(finalizedItems);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to read receipt. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!scannedItems || scannedItems.length === 0) {
      setError("No Items in the Scanning List. Please add items");
      return
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const body = scannedItems.map((item) => ({
        name: item.name,
        category: item.category,
        quantity: Number(item.quantity),
        unit: item.unit,
        expirationDate: item.expirationDate,
      }));

      console.log("body", body);

      // ---------------waiting for the ai scan api to fix category naming mismatch and then test submitting to grocery list----------------------------
      await api.post("/api/grocery/", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Items successfully added");

      setScannedItems([]);

      navigate("/fridge");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something Went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth={{ xs: "xs", md: "lg" }}>
      <Nav handleClickBack={() => navigate(-1)} />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}

      <Camera
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        previewImage={previewImage}
        loading={loading}
      />

      {scannedItems.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={handleScanReceipt}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
            sx={{
              py: 2,
              width: { xs: "80%", md: "30%" },
            }}
          >
            {loading ? "Process Receipt with AI..." : "Scan Receipt"}
          </Button>
        </Box>
      )}

      {scannedItems.length > 0 && (
        <Box
          sx={{
            mt: 4,
            mb: 9,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <SectionHeader />
          <Grid container spacing={{ xs: 1, md: 3 }} sx={{ mt: 2, pb: 4 }}>
            {scannedItems.map((item, index) => (
              <Grid size={6} sx={{ display: "flex" }} key={index}>
                <ReceiptItem
                  name={item.name}
                  category={item.category}
                  expiryDays={item.expiryDays}
                  quantity={item.quantity}
                  unit={item.unit}
                  index={index}
                  expirationDate={item.expirationDate}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleDeleteItem={handleDeleteItem}
                  handleNameChange={handleNameChange}
                  handleDateChange={handleDateChange}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <CheckCircleOutlineOutlinedIcon />
              )
            }
            sx={{ py: 2 }}
            onClick={handleSubmit}
            disabled={loading || scannedItems.length === 0}
          >
            Confirm All Items
          </Button>
        </Box>
      )}
    </Container>
  );
}
