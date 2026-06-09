const express = require("express");
const router = express.Router();

const {
  getGroceryItems,
  getGroceryItemById,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
} = require("../controllers/grocery.controller.js");

router.route("/").get(getGroceryItems).post(addGroceryItem);
router
  .route("/:id")
  .patch(updateGroceryItem)
  .delete(deleteGroceryItem)
  .get(getGroceryItemById);

module.exports = router;
