const getGroceryItems = async (req, res) => {
  return res.status(200).json({ message: "get all items" });
};

const getGroceryItemById = async (req, res) => {
  return res.status(200).json({ message: "get item by id" });
};

const addGroceryItem = async (req, res) => {
  return res.status(200).json({ message: "add grocery item" });
};

const updateGroceryItem = async (req, res) => {
  return res.status(200).json({ message: "update grocery item" });
};

const deleteGroceryItem = async (req, res) => {
  return res.status(200).json({ message: "returning all items" });
};

module.exports = {
  getGroceryItems,
  getGroceryItemById,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
};
