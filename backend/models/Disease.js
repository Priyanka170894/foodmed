// models/Disease.js
import mongoose from 'mongoose';

// Define the Disease schema
const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  motivation: { type: String, required: true },
  organId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the 'Organ' model
  groceries: [{
    grocery_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Grocery'}, // Reference to the 'Grocery' model
    description: { type: String, required: true } // Specific description for the disease
  }]
}, { collection: 'diseases' }); // Specifying the collection name

// Create the Disease model
const Disease = mongoose.model('Disease', DiseaseSchema);
export default Disease;
