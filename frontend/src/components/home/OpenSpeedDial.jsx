import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


const actions = [
  { icon: <DocumentScannerIcon />, name: "Scan" },
  { icon: <AddCircleOutlineOutlinedIcon />, name: "Add" },
];

export default function OpenSpeedDial() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action === "scan") {
      navigate("/scan");
    } else {
      navigate("add-items");
    }
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{
          position: "fixed",
          bottom: 80,
          right: 35,
          zIndex: 1300,

          "& .MuiSpeedDial-fab": {
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            "&:hover": {
              bgcolor: "none",
            },
          },
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            slotProps={{
              tooltip: {
                title: action.name,
              },
            }}
            onClick={() => handleClick(action.name)}
          />
        ))}
      </SpeedDial>
    </>
  );
}
