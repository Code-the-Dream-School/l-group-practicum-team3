import Button from '@mui/material/Button'

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Nav({handleClickBack}) {
  return (
      <nav>
        <Button
          size="large"
          sx={{ fontWeight: "bold", fontSize: "large" }}
          startIcon={<ArrowBackIcon />}
          onClick={handleClickBack}
        >
          Scan Receipt
        </Button>
      </nav>
  )
}
