import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ReceiptItem from "../../components/scanning-page/ReceiptItem";



export default function ScanningPage() {
  return (
    <Container>
      <nav>
        <Button
          size="large"
          sx={{ fontWeight: "bold", fontSize: "large" }}
          startIcon={<ArrowBackIcon />}
        >
          Scan Receipt
        </Button>
      </nav>

     <ReceiptItem />
         
     
      
    </Container>
  );
}
