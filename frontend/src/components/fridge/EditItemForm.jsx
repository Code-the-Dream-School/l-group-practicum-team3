import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";
import api from "../../utils/axios";
import theme from "../../utils/theme";

export default function ItemEditForm({ item = {}, onSuccess, onCancel }) {
  const [values, setValues] = useState({
    quantity: item.quantity ?? "",
    expiry_date: item.expiry_date ?? "",
  });

  //   console.log("values", values);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (values.quantity === "") {
      next.quantity = "Quantity is required.";
    } else if (isNaN(Number(values.quantity)) || Number(values.quantity) < 0) {
      next.quantity = "Quantity must be a valid number.";
    }
    if (values.expiry_date === "") {
      next.expiry_date = "Expiry date is required.";
    }
    return next;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      quantity: Number(values.quantity),
      expiry_date: values.expiry_date
        ? values.expiry_date.format("YYYY-MM-DD")
        : null,
    };

    setLoading(true);
    try {
      await api.patch(`/api/grocery/${item.grocery_id}`, data);
      if (onSuccess) {
        onSuccess({
          ...item,
          quantity: data.quantity,
          expiry_date: data.expiry_date,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} mb={0.5}>
        EDIT
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Update the quantity and expiry date.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2.5}>
        <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>Quantity</Typography>
        <TextField
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
          fullWidth
          size="small"
          inputProps={{ inputMode: "numeric" }}
          sx={{
            border: `1px solid ${theme.palette.neutral.main}`,
            borderRadius: "5rem",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${theme.palette.neutral.dark}`,
            },
          }}
        />

        <Typography sx={{ fontSize: { xs: 14, sm: 16 } }}>
          Expiry Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY - MM - DD"
            value={values.expiry_date ? dayjs(values.expiry_date) : null}
            onChange={(newValue) => {
              setValues((prev) => ({ ...prev, expiry_date: newValue }));
            }}
            sx={{
              bgcolor: "white",
              borderRadius: "5rem",
              marginBlockEnd: "1rem",
              "& .MuiPickersOutlinedInput-root": {
                borderRadius: "5rem",
              },
              "& .MuiPickersOutlinedInput-notchedOutline": {
                border: `1px solid ${theme.palette.neutral.main}`,
                borderRadius: "5rem",
              },
            }}
          />
        </LocalizationProvider>
      </Stack>

      <Divider sx={{ mt: 3, mb: 2 }} />

      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {loading ? "Saving…" : "Save Changes"}
        </Button>
      </Stack>
    </Box>
  );
}
