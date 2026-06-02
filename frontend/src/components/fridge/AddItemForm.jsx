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
import theme from "../../utils/theme";
import Typography from "@mui/material/Typography";
import { ThemeContext } from "@emotion/react";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1,
        bgcolor: "white",
        border: `1px solid ${theme.palette.neutral.main}`,
        borderRadius: "5rem",
        "&:hover": {
          border: `1px solid ${theme.palette.neutral.main}`,
        },
      }}
    >
      <IconButton onClick={handleDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        name="quantity"
        value={value}
        onChange={onChange}
        sx={{
          width: "60px",
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
  const handleChange = (e) => {
    onChange({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    onChange({
      ...formData,
      expiry_date: newValue,
    });
  };

  return (
    // container form
    <Box
      sx={{
        display: "grid",
        bgcolor: theme.palette.neutral.light,
        p: { sm: 1, xm: 2 },
        borderRadius: "1rem",
      }}
    >
      <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>ITEM NAME</Typography>
      <TextField
        placeholder="e.g Tomatoes"
        name="name"
        value={formData.name}
        onChange={handleChange}
        sx={{
          "& .MuiInputBase-root": {
            background: "white",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.neutral.dark}`,
          },
          marginBlockEnd: "1rem",
          border: `1px solid ${theme.palette.neutral.main}`,
          borderRadius: "5rem",
        }}
      />
      {/* quantity and unit container */}
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          marginBlockEnd: "1rem",
          "& > *": {
            flex: "1",
          },
        }}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>
            QUANTITY
          </Typography>
          <NumberField value={formData.quantity} onChange={handleChange} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>UNIT</Typography>
          <FormControl
            fullWidth
            sx={{
              bgcolor: "white",
              border: `1px solid ${theme.palette.neutral.main}`,
              borderRadius: "5rem",
            }}
          >
            <Select
              labelId="ingredient-unit"
              id="unit-select"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              displayEmpty
              MenuProps={{
                sx: {
                  "& .MuiMenu-paper": {
                    maxHeight: "200px",
                    overflow: "auto",
                  },
                  "& .MuiMenu-list": {
                    maxHeight: "200px",
                    overflow: "auto",
                  },
                },
              }}
              sx={{
                color: formData.unit === "" ? "gray" : "inherit",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: `1px solid ${theme.palette.neutral.dark}`,
                },
              }}
            >
              <MenuItem value="" disabled>
                SELECT UNIT
              </MenuItem>
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
        </Box>
      </Box>

      <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>EXPIRY DATE</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="YYYY - MM - DD"
          value={formData.expiry_date}
          onChange={handleDateChange}
          sx={{
            bgcolor: "white",
            borderRadius: "5rem",
            marginBlockEnd: "1rem",
            "& .MuiPickersOutlinedInput-root": {
              borderRadius: "5rem",
            },
            "& .MuiPickersOutlinedInput-notchedOutline": {
              borderRadius: "5rem",
            },
          }}
        />
      </LocalizationProvider>

      <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>CATEGORY</Typography>
      <FormControl
        fullWidth
        sx={{
          bgcolor: "white",
          marginBlockEnd: "1rem",
          borderRadius: "5rem",
          border: `1px solid ${theme.palette.neutral.main}`,
        }}
      >
        <Select
          labelId="ingredient-category"
          id="category-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
          displayEmpty
          MenuProps={{
            sx: {
              "& .MuiMenu-paper": {
                maxHeight: "200px",
                overflow: "auto",
              },
              "& .MuiMenu-list": {
                maxHeight: "200px",
                overflow: "auto",
              },
            },
          }}
          sx={{
            color: formData.category === "" ? "gray" : "inherit",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${theme.palette.neutral.dark}`,
            },
          }}
        >
          <MenuItem value="" disabled>
            SELECT A CATEGORY
          </MenuItem>
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
