import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import AddIngredientForm from "../../components/fridge/AddItemForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import api from "../../utils/axios";
import Typography from "@mui/material/Typography";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function FridgeAddIngredient() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([
    { name: "", category: "", quantity: 0, unit: "", expiry_date: null },
  ]);

  const handleChange = (index, updatedForm) => {
    const updatedForms = forms.map((form, i) =>
      i === index ? updatedForm : form,
    );
    setForms(updatedForms);
  };

  const handleAddMore = () =>
    setForms([
      ...forms,
      { name: "", category: "", quantity: 0, unit: "", expiry_date: null },
    ]);

  const handleSubmit = async () => {
    const data = forms.map((form) => ({
      ...form,
      expiry_date: form.expiry_date
        ? dayjs(form.expiry_date).format("YYYY-MM-DD")
        : null,
    }));

    console.log("this is the data submitted", data);

    try {
      const response = await api.post("/api/grocery", data);
      setForms([
        { name: "", category: "", quantity: 0, unit: "", expiry_date: null },
      ]);
      navigate("/");
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          width: "auto",
        }}
        onClick={() => navigate("/")}
      >
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          Add Item
        </Typography>
      </Box>
      {/* scan receipt box*/}
      <Box
        sx={{
          backgroundImage: "url(../src/assets/bg_receipt_scan.jpg)",
          backgroundPosition: "center",
          width: "30rem",
          height: "15rem",
          display: "flex",
          alignItems: "end",
        }}
      >
        <Box
          // update to redirect to scan-receipt page
          onClick={() => navigate("/scan-receipt")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            p: 1,
            borderRadius: "50px",
            bgcolor: "yellow",
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
            width: "100%",
          }}
        >
          <DocumentScannerIcon sx={{ fontSize: 40, color: "primary.dark" }} />
          <Typography
            sx={{ fontWeight: "bold", fontSize: 18, color: "primary.dark" }}
          >
            SCAN RECEIPT
          </Typography>
        </Box>
      </Box>
      <Typography>Quickly add items from your grocery receipt</Typography>
      <Box>
        {forms.map((formData, index) => (
          <AddIngredientForm
            key={index}
            formData={formData}
            onChange={(updatedForm) => handleChange(index, updatedForm)}
          />
        ))}
        <Button onClick={handleAddMore}>Add one more item</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add to Inventory
        </Button>
      </Box>
      );
    </>
  );
}
