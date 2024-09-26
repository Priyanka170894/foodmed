import Wishlist from '../models/Wishlist.js';
import Cart from '../models/Cart.js';
import asyncHandler from '../middlewares/asyncHandler.js';

//Viewing the wishlist
export const viewWishlist = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated token
  
    // Find the wishlist for the user and populate grocery details
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items.grocery', 'name price image');
  
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
  
    res.json(wishlist);
  });


// Add an item to the wishlist (protected)
export const addItemToWishlist = asyncHandler(async (req, res) => {
  const { groceryId } = req.body;
  const userId = req.user._id; // Get user ID from authenticated token

  // Check if a wishlist exists for the user
  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    // If no wishlist exists, create a new one
    wishlist = new Wishlist({ user: userId, items: [] });
  }

  // Check if the grocery item already exists in the wishlist
  const itemExists = wishlist.items.some(item => item.grocery.toString() === groceryId);

  if (!itemExists) {
    // Add item to the wishlist
    wishlist.items.push({ grocery: groceryId });
    await wishlist.save();
    res.status(200).json({ message: 'Item added to wishlist successfully', wishlist });
  } else {
    res.status(400).json({ message: 'Item already exists in the wishlist' });
  }
});

// Remove an item from the wishlist (protected)
export const removeItemFromWishlist = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Get user ID from authenticated token

  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return res.status(404).json({ message: 'Wishlist not found' });
  }

  // Remove the item from the wishlist
  wishlist.items = wishlist.items.filter(item => item._id.toString() !== itemId);
  await wishlist.save();

  res.json({ message: 'Item removed from wishlist successfully', wishlist });
});

// Move an item from wishlist to cart (protected)
export const moveItemToCart = asyncHandler(async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user._id; // Get user ID from authenticated token

    // Log to check if userId and itemId are coming through
    console.log('User ID:', userId);
    console.log('Item ID:', itemId);

    // Find user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Find the item in the wishlist
    const itemToMove = wishlist.items.find(item => item._id.toString() === itemId);
    
    if (!itemToMove) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item is already in the cart
    const itemExistsInCart = cart.items.some(item => item.grocery.toString() === itemToMove.grocery.toString());

    if (!itemExistsInCart) {
      // Add item to cart if it doesn't exist
      cart.items.push({ grocery: itemToMove.grocery, quantity: 1 });
      await cart.save();

      // Remove item from the wishlist
      wishlist.items = wishlist.items.filter(item => item._id.toString() !== itemId);
      await wishlist.save();

      return res.status(200).json({ message: 'Item moved to cart successfully', cart });
    } else {
      return res.status(400).json({ message: 'Item already exists in the cart' });
    }
  } catch (error) {
    console.error('Error moving item to cart:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});
