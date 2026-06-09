import { useState } from "react";
import { Paper, Stack, Typography, TextField, Box, IconButton, 
    Select, MenuItem, Fab,} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function AddItemForm({ onClose, onSave }) {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("piece");
    const [category, setCategory] = useState("other");

    const handleSave = () => {
        if (!itemName.trim()) return;

        onSave({
            name: itemName.trim(),
            quantity: quantity.toString(),
            unit: unit,
            category: category,
            completed: false,
        });

        // reset form
        setItemName("");
        setQuantity(1);
        setUnit("piece");
        setCategory("other");
    };

    const STEP = {
        g: 50,
        kg: 1,
        lb: 1,
        oz: 1,
        l: 1,
        ml: 50,
        cup: 1,
        tbsp: 1,
        tsp: 1,
        piece: 1
    };

    const step = STEP[unit] || 1;

    const updateQuantity = (changeAmount) => {
        setQuantity(prev => Math.max(1, prev + changeAmount));
    }
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 8,
                bgcolor: "neutral.main",
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
                minHeight: 88,
                border: "none",
                boxSizing: "border-box",                               
            }}
        >
            <Stack spacing={3} sx={{width: "100%"}}>
                {/* Top Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "primary.main",
                        }}
                    >
                        Add Item
                    </Typography>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Item Name */}
                <Box>
                    <Typography
                        sx={{
                            mb: 1,
                            color: "primary.main",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            letterSpacing: 1,
                        }}
                    >
                        ITEM NAME
                    </Typography>

                    <TextField 
                        fullWidth
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="e.g. Fresh Ginger"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                height: 45,
                                bgcolor: "neutral.light",
                                borderRadius: "999px",

                                "& fieldset": {
                                    border: "none",
                                }
                            },
                            "& input": {
                                px:2,
                                fontSize: "1.2rem",
                            },                            
                        }}
                    />
                </Box>

                {/* QTY + UNIT */}
                <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            sx={{
                                mb: 1,
                                color: "primary.main",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                                letterSpacing: 1,
                            }}
                        >
                            QTY
                        </Typography>

                        <Box
                            sx={{
                                height: 40,
                                bgcolor: "neutral.light",
                                borderRadius: "999px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 5,
                            }}
                        >
                            <IconButton 
                                onClick={() => updateQuantity(-step)}
                                disabled={quantity <= 1}
                            >
                                <RemoveIcon />
                            </IconButton>

                            <Typography sx={{ fontWeight: 700, fontSize: "1rem", }}>
                                {quantity} 
                            </Typography>

                            <IconButton onClick={() => updateQuantity(step)}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    </Box> 

                    {/* Unit */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            sx={{
                                mb: 1,
                                color: "primary.main",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                                letterSpacing: 1,
                            }}
                        >
                            UNIT
                        </Typography>

                        <Select
                            fullWidth
                            value={unit}
                            onChange={e => {
                                setUnit(e.target.value);
                                setQuantity(1);
                            }}
                            IconComponent={KeyboardArrowDownIcon}
                            sx={{
                                height: 40,
                                bgcolor: "neutral.light",
                                borderRadius: "999px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },

                                "& .MuiSelect-select": {
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "1rem",
                                    px: 3,
                                }
                            }}
                        >
                            <MenuItem value="piece">piece</MenuItem>
                            <MenuItem value="kg">kg</MenuItem>
                            <MenuItem value="g">g</MenuItem>
                            <MenuItem value="lb">lb</MenuItem>
                            <MenuItem value="oz">oz</MenuItem>
                            <MenuItem value="l">l</MenuItem>
                            <MenuItem value="ml">ml</MenuItem>
                            <MenuItem value="cup">cup</MenuItem>
                            <MenuItem value="tbsp">tbsp</MenuItem>
                            <MenuItem value="tsp">tsp</MenuItem>
                        </Select>
                    </Box>                       
                </Stack>

                {/* Category + Submit */}
                <Stack direction="row" spacing={2} > 
                    <Box sx={{flex: 1, minWidth: 0,}}>
                        <Typography
                            sx={{                                
                                mb: 1,
                                color: "primary.main",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                                letterSpacing: 1,
                            }}
                        >
                            CATEGORY
                        </Typography>

                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            fullWidth                          
                            IconComponent={KeyboardArrowDownIcon}
                            sx={{
                                height: 45,
                                bgcolor: "neutral.light",
                                borderRadius: "999px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                }
                            }}
                        >
                            <MenuItem value="fruit">Fruit</MenuItem>
                            <MenuItem value="vegetable">Vegetable</MenuItem>
                            <MenuItem value="dairy">Dairy</MenuItem>
                            <MenuItem value="meat">Meat</MenuItem>
                            <MenuItem value="spice">Spice</MenuItem>
                            <MenuItem value="condiment">Condiment</MenuItem>
                            <MenuItem value="canned">Canned</MenuItem>
                            <MenuItem value="other">Other</MenuItem>                                                   

                        </Select>
                    </Box> 

                    <Fab
                        onClick={handleSave}
                        disabled={!itemName.trim()}
                        sx={{
                            width: 55,
                            height: 55,
                            ml: 1,
                            alignSelf: "flex-end",
                            boxShadow: 4,
                            bgcolor: "primary.main",
                            color: "common.white",
                            transition: "all 0.2s ease",

                            "&:hover": {
                                bgcolor: "primary.dark",
                                transform: "scale(1.05)",
                            }
                        }}                        
                    >
                        <AddIcon sx={{ fontSize: 32 }}/>
                    </Fab>         
                
                </Stack>
            </Stack>
        </Paper>
    )
}