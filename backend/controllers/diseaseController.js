
import Disease from '../models/Disease.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import mongoose from 'mongoose';


//Fetching all diseases
export const getAllDiseases = asyncHandler(async (req, res) => {
  const diseases = await Disease.find().select('name description motivation');
  res.json(diseases);
});

//Fetching diseases by organ
export const getDiseasesByOrgan = asyncHandler(async (req, res) => {
  const { organId } = req.params;
  console.log('Received organId:', organId);

  if (!mongoose.isValidObjectId(organId)) {
    return res.status(400).json({ message: 'Invalid organId' });
  }

  // Fetch diseases associated with a specific organ
  const diseases = await Disease.find({organ_id: organId}).select('name description motivation');

  if (!diseases || diseases.length === 0) {
    return res.status(404).json({ message: 'No diseases found for this organ' });
  }

  res.json(diseases);
});

// Get disease details including groceries
export const getDiseaseDetails = asyncHandler(async (req, res) => {
  const { diseaseId } = req.params;

  // Fetch disease details and populate the groceries with their basic info from the groceries collection
  const disease = await Disease.findById(diseaseId)
    .populate({
      path: 'groceries.grocery_id', // Populates the grocery_id field in the groceries array
      model: 'Grocery', // References the Grocery collection
      select: 'name price image quantity' // Select fields to include from the populated Grocery documents
    });

  if (!disease) {
    return res.status(404).json({ message: 'Disease not found' });
  }

  // Construct response to include grocery descriptions from Disease collection
  const response = {
    _id: disease._id,
    name: disease.name,
    description: disease.description,
    motivation: disease.motivation,
    organ: disease.organ,
    groceries: disease.groceries.map(grocery => ({
      _id: grocery.grocery_id._id,
      name: grocery.grocery_id.name,
      price: grocery.grocery_id.price,
      image: grocery.grocery_id.image,
      quantity: grocery.grocery_id.quantity,
      description: grocery.description // Include the specific description from the Disease collection
    }))
  };

  res.json(response);
});
