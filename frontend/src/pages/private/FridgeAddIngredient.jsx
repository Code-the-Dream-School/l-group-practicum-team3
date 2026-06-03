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
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import theme from "../../utils/theme";

export default function FridgeAddIngredient() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([
    { name: "", category: "", quantity: 1, unit: "", expiry_date: null },
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
      { name: "", category: "", quantity: 1, unit: "", expiry_date: null },
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
      await api.post("/api/grocery", data);
      setForms([
        { name: "", category: "", quantity: 1, unit: "", expiry_date: null },
      ]);
      // add confirmation screen before redirect
      navigate("/");
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
        onClick={() => navigate(-1)}
      >
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ fontWeight: "bold", fontSize: { sx: 16, sm: 20 } }}>
          Add Item
        </Typography>
      </Box>
      {/* scan receipt form */}

      <Box sx={{ px: { xs: 1, sm: 2 }, minHeight: "100vh" }}>
        <Box
          sx={{
            backgroundImage: "url(../src/assets/bg_receipt_scan.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "100%",
            height: { xs: "10rem", sm: "15rem" },
            display: "flex",
            alignItems: "end",
            borderRadius: "3rem",
          }}
        >
          <Box
            // update to redirect to scan-receipt page
            onClick={() => navigate("/scan")}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              p: "0.758rem",
              borderRadius: "50px",
              bgcolor: theme.palette.secondary.main,
              cursor: "pointer",
              "&:hover": { opacity: "0.9" },
              width: "100%",
              marginInline: "1rem",
              marginBlockEnd: "1rem",
            }}
          >
            <DocumentScannerIcon
              sx={{ fontSize: { xs: 28, sm: 40 }, color: "primary.dark" }}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { sx: 14, sm: 18 },
                color: "primary.dark",
              }}
            >
              SCAN RECEIPT
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{ textAlign: "center", mt: 1, fontSize: { xs: 13, sm: 15 } }}
        >
          Quickly add items from your grocery receipt
        </Typography>

        {/* form body container */}
        <Box
          // change for form body
          sx={{
            p: { xs: 1, sm: 2 },
            pb: { xs: "80px", sm: 3 },
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              marginBlockEnd: "1rem",
              fontSize: { xs: 14, sm: 25 },
            }}
          >
            Manual Entry
          </Typography>
          <Box>
            {forms.map((formData, index) => (
              <AddIngredientForm
                key={index}
                formData={formData}
                onChange={(updatedForm) => handleChange(index, updatedForm)}
              />
            ))}

            <Box
              sx={{
                marginBlockStart: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Button
                onClick={handleAddMore}
                sx={{
                  outline: `3px dashed ${theme.palette.neutral.main}`,
                  width: { xs: "100%", sm: "90%" },
                  alignSelf: "center",
                  fontSize: { xs: 11, sm: 15 },
                  p: 1,
                  "&:hover": { outlineColor: theme.palette.primary.dark },
                }}
              >
                <AddCircleOutlineRoundedIcon
                  sx={{ mr: "0.3rem", fontSize: { xs: 16, sm: 20 } }}
                />
                Add one more item
              </Button>
              <Button
                onClick={handleSubmit}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  width: "100%",
                  color: theme.palette.neutral.light,
                  fontSize: { xs: 12, sm: 15 },
                  p: 3,
                  mt: 3,
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                }}
              >
                <SaveIcon sx={{ mr: "0.2rem", fontSize: { xs: 16, sm: 19 } }} />
                Add to Inventory
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
