import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { alpha } from "@mui/material/styles";

export default function Camera({
  fileInputRef,
  handleFileChange,
  previewImage,
  loading,
}) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "320px",
          backgroundColor: "#1B1C18",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          mb: 2,

          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.8 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: loading ? "none" : "auto",
        }}
        onClick={() =>{
          if (loading) return;
          fileInputRef.current.click()
        } }
      >
        {previewImage ? (
          <Box
            component="img"
            src={previewImage}
            alt="Receipt preview"
            sx={{
              width: "75%",
              height: "60%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Typography
            sx={{ color: "#6D6B65", fontSize: "14px", fontWeight: 600 }}
          >
            Take A Picture of the Receipt
          </Typography>
        )}

        {/* camera */}
        <Box
          sx={{
            position: "absolute",
            bottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            zIndex: 999,
          }}
        >
          <IconButton
            sx={{
              backgroundColor: alpha("#FBF9F2", 0.2),
              color: "#FFFFFF",
              padding: "8px",
            }}
          >
            <FlashOnIcon />
          </IconButton>
          <IconButton
            size="large"
            sx={{
              backgroundColor: "#FDD34D !important",
              color: "secondary.contrastText",
              padding: "16px",
            }}
          >
            <CameraAltOutlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: alpha("#FBF9F2", 0.2),
              color: "#FFFFFF",
              padding: "8px",
            }}
          >
            <InsertPhotoIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
