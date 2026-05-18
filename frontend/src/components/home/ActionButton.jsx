import Button from "@mui/material/Button";

export default function ActionButton({
  onClick,
  bgColor,
  textColor,
  startIcon,
  children,
}) {
  return (
    <Button
      startIcon={startIcon}
      variant="contained"
      onClick={onClick}
      sx={{
        flex: 1,
        py: 2.5,
        borderRadius: 3,
        fontWeight: "bold",
        fontSize: "16px",
        backgroundColor: bgColor,
        color: textColor,
        width: "100%",
        maxWidth: { xs: "none", md: "280px" },
      }}
    >
      {children}
    </Button>
  );
}
