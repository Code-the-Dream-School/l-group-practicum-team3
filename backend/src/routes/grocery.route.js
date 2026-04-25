const { express } = require("express");
const router = express.Router();

const {
  getGroceryItems,
  getGroceryItemById,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
} = require("../controllers/grocery.controller.js");

router.get("/", getGroceryItems);
router.post("/", addGroceryItem);
router.route("/:id").patch(updateGroceryItem).delete(deleteGroceryItem);
