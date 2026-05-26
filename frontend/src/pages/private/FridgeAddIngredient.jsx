import { useState } from "react";
import dayjs from "dayjs";
import AddIngredientForm from "../../components/fridge/AddItemForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import api from "../../utils/axios";

export default function FridgeAddIngredient() {
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

    try {
      const response = await api.post("/api/grocery", data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
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
}
