import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const NumberField = ({ value, onChange }) => {
  const handleIncrement = () => {
    onChange({ target: { name: "quantity", value: value + 1 } });
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange({ target: { name: "quantity", value: value - 1 } });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton onClick={handleDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        name="quantity"
        label="Quantity"
        value={value}
        onChange={onChange}
        sx={{
          width: "80px",
          textAlign: "center",
          "& input[type=number]": {
            MozAppearance: "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
        }}
        inputProps={{ min: 0, style: { textAlign: "center" } }}
      />
      <IconButton onClick={handleIncrement}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};
export default function AddIngredientForm({ formData, onChange }) {
  console.log(formData);

  const handleChange = (e) => {
    onChange({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    onChange({
      ...formData,
      expiry_date: newValue,
    });
  };

  console.log(formData.unit);

  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        label="Item name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <NumberField value={formData.quantity} onChange={handleChange} />
      <FormControl fullWidth>
        <InputLabel id="ingredient-unit">Unit</InputLabel>
        <Select
          labelId="ingredient-unit"
          id="unit-select"
          name="unit"
          value={formData.unit}
          label="unit"
          onChange={handleChange}
        >
          <MenuItem value={"kg"}>kg</MenuItem>
          <MenuItem value={"g"}>g</MenuItem>
          <MenuItem value={"lb"}>lb</MenuItem>
          <MenuItem value={"oz"}>oz</MenuItem>
          <MenuItem value={"l"}>l</MenuItem>
          <MenuItem value={"ml"}>ml</MenuItem>
          <MenuItem value={"cup"}>cup</MenuItem>
          <MenuItem value={"tbsp"}>tbsp</MenuItem>
          <MenuItem value={"tsp"}>tsp</MenuItem>
          <MenuItem value={"piece"}>piece</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date Field"
          format="YYYY - MM - DD"
          value={formData.expiry_date}
          onChange={handleDateChange}
        />
      </LocalizationProvider>

      <FormControl fullWidth>
        <InputLabel id="ingredient-category">Category</InputLabel>
        <Select
          labelId="ingredient-category"
          id="category-select"
          name="category"
          value={formData.category}
          label="category"
          onChange={handleChange}
        >
          <MenuItem value={"dairy"}>dairy</MenuItem>
          <MenuItem value={"meat"}>meat</MenuItem>
          <MenuItem value={"fruit"}>fruit</MenuItem>
          <MenuItem value={"vegetable"}>vegetable</MenuItem>
          <MenuItem value={"spice"}>spice</MenuItem>
          <MenuItem value={"condiment"}>condiment</MenuItem>
          <MenuItem value={"canned"}>canned</MenuItem>
          <MenuItem value={"other"}>other</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
