import mongoose from 'mongoose';

// Define the Grocery schema
const GrocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  averageRating: { type: Number, default: 0 }, // Add averageRating field
}, { timestamps: true });

// Create the Grocery model
const Grocery = mongoose.model('Grocery', GrocerySchema);

export default Grocery;
