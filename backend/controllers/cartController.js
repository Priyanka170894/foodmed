import Cart from '../models/Cart.js';
import asyncHandler from '../middlewares/asyncHandler.js';



export const addItemToCart = asyncHandler(async (req, res) => {
 
  const { groceryId, quantity = 1} = req.body; // Default quantity to 1

  // Get user ID from authenticated token (make sure `req.user` is set in your auth middleware)
  const userId = req.user?._id; // Verify that the user ID is present

  // Validation: Check if the required fields are present
  if (!groceryId ) {
    return res.status(400).json({ message: 'Grocery ID is required' });
  }

  // Validation: Check for user presence
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Prevent adding negative or zero quantity
  if (quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  // Check if the cart exists for the user
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // If no cart exists, create a new one
    cart = new Cart({ user: userId, items: [] });
  }

  // Check if the grocery item already exists in the cart
  const itemIndex = cart.items.findIndex(item => item.grocery.toString() === groceryId);

  if (itemIndex > -1) {
    // If item exists, update the quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // If item does not exist, add it to the cart
    cart.items.push({ grocery: groceryId, quantity });
  }

  await cart.save();
  res.status(200).json({ message: 'Item added to cart successfully', cart });
});


// Get cart for a user
export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from authenticated token

  // Find the cart for the user and populate grocery details
  const cart = await Cart.findOne({ user: userId }).populate('items.grocery', 'name price image quantity');

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  res.json(cart);
});

// Update cart item quantity
export const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const userId = req.user._id; // Get user ID from authenticated token

  // Validate quantity
  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const item = cart.items.id(itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  item.quantity = quantity;
  await cart.save();

  res.json({ message: 'Cart item updated successfully', cart });
});

// Remove item from cart
export const removeCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Get user ID from authenticated token

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const item = cart.items.id(itemId);
  
  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  cart.items = cart.items.filter(item => item._id.toString() !== itemId);
  await cart.save();

  res.json({ message: 'Item removed from cart successfully', cart });
});

// Clear all items from the cart
export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from authenticated token

  // Find the cart for the user
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  // Clear all items in the cart
  cart.items = [];
  
  // Save the updated cart
  await cart.save();

  res.json({ message: 'Cart cleared successfully' });
});