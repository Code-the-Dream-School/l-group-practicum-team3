import  {Leaf } from "lucide-react";
import { Box, Typography } from "@mui/material";

export default function AppLogo() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                    xs: "flex-start",
                    sm: "center",
                },
                gap: 1,
                mb: 3,
                width: "100%",
                color: "primary.main",
            }}
        >
            <Leaf
                size={25}
                strokeWidth={2.5}
                color="currentColor"
            />
            <Typography
                sx={{
                    color: "primary.main",
                    fontWeight: 800,
                    lineHeight: 1,
                    fontSize: {
                        xs: "1.2rem",
                        sm: "2.4rem",
                    }
                }}
            >
                Smart Kitchen App
            </Typography>
        </Box>
    )
}