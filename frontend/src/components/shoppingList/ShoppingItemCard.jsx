import { Paper, Box, Typography, Checkbox, Chip, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

export default function ShoppingItemCard( {item, onToggle, onDelete}) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 8,
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
            {/* Checkbox */}
            <Checkbox
                checked={item.completed}
                onChange={() => onToggle(item.id)}
                sx={{
                    color: "neutral.dark",
                    "&.Mui-checked": {
                        color: "primary.main",
                    }
                }}
            />

            {/*Text*/}
            <Box flex={1}>
                <Typography
                    sx={{
                        fontWeight: 700,
                        fontSize: "1.3rem",
                        color: item.completed ? "neutral.dark" : "common.black",
                        opacity: item.completed ? 0.6 : 1,
                    }}
                >
                    {item.name}
                </Typography>

                <Typography
                    sx={{
                        color: "neutral.dark",
                        fontSize: "1rem",
                        mt: 0.5,
                    }}
                >
                    {item.quantity} {item.unit}
                </Typography>
            </Box>

            {/*Category*/}
            <Chip 
                label={item.category.toUpperCase()}
                sx={{
                   bgcolor: "secondary.main",
                    color: "secondary.contrastText",
                    fontWeight: 700,
                    borderRadius: "999px",
                    mr: "auto",
                }}
            />

            <IconButton onClick={() => onDelete(item.id)}>
                <DeleteOutlineIcon 
                    sx={{
                        color: "neutral.dark",
                    }}
                />
            </IconButton>
        </Paper>
    )
}