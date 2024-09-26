import mongoose from 'mongoose';

// Define the Review sub-schema
const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Ratings from 1 to 5
 
  },
  comment: {
    type: String,
    required: true,
   
  },
  
}, { _id: false }); // Setting _id to false as it's a sub-document

// Define the Address sub-schema
const AddressSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, { _id: false }); // Setting _id to false as it's a sub-document

// Define the Order schema
const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      grocery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grocery',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      review: {
        type: ReviewSchema,  // Embed the ReviewSchema inside each item
        default: null,  // Initially, there will be no review
      },
    },
  ],
  deliveryAddress: {
    type: AddressSchema, // Embedding the Address schema for delivery address
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled','Completed'],
    default: 'Pending',
  },
  trackingDetails: {
    estimatedDelivery: {
      type: Date,
      default: null,
    },
    carrier: {
      type: String,
      default: null,
    },
    trackingNumber: {
      type: String,
      default: null,
    },
    currentLocation: {
      type: String,
      default: null,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Create the Order model
const Order = mongoose.model('Order', OrderSchema);

export default Order;
