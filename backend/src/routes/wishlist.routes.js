const express = require("express");
const router = express.Router();

const {
  getWishlistItems,
  addWishlistItems,
  updateWishlistItem,
  deleteWishlistItem,
  clearWishlist,
} = require("../controllers/wishlist.controller.js");

router
  .route("/")
  .get(getWishlistItems)
  .post(addWishlistItems)
  .delete(clearWishlist);

router.route("/:id").patch(updateWishlistItem).delete(deleteWishlistItem);

module.exports = router;
