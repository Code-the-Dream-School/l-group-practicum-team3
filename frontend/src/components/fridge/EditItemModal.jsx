import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import EditItemForm from "./EditItemForm";

export default function EditItemModal({
  open,
  onClose,
  item,
  onSuccess,
  onDelete,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSuccess = (updatedValues) => {
    onSuccess?.(updatedValues);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: fullScreen ? 0 : 2 },
      }}
    >
      <DialogContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <EditItemForm
          item={item}
          onSuccess={handleSuccess}
          onCancel={onClose}
          onDelete={() => onDelete(item.grocery_id)}
        />
      </DialogContent>
    </Dialog>
  );
}
