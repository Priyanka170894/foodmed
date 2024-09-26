// models/Organ.js
import mongoose from 'mongoose';

// Define the Organ schema
const OrganSchema = new mongoose.Schema({
  name: { type: String, required: true },
  diseases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disease' }], // Referencing the 'Disease' collection
  image: { type: String, required: true }
}, { collection: 'organs' }); // Specifying the collection name

// Create the Organ model
const Organ = mongoose.model('Organ', OrganSchema);
export default Organ;
