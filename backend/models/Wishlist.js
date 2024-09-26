import mongoose from 'mongoose';

// Define the Wishlist schema
const WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Wishlist must be associated with a user
  },
  items: [
    {
      grocery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grocery',
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
}, { timestamps: true });

// Create the Wishlist model
const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;
