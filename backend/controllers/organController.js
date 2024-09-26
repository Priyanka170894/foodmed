// controllers/organController.js
import Organ from '../models/Organ.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Get all organs (without populating diseases)
export const getAllOrgans = asyncHandler(async (req, res) => {
  const organs = await Organ.find(); 
  res.json(organs);
});
export const getOrgansFilter = asyncHandler(async (req, res) => {
  const organs = await Organ.find().select('name');; 
  res.json(organs);
});