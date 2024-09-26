import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  grocery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grocery',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  
});

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
