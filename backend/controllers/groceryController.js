// controllers/groceryController.js
import Grocery from '../models/Grocery.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all groceries
export const getAllGroceries = asyncHandler(async (req, res) => {
  const groceries = await Grocery.find();
  res.json(groceries);
});
