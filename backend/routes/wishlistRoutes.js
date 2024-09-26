import express from 'express';
import { viewWishlist, addItemToWishlist, removeItemFromWishlist, moveItemToCart } from '../controllers/wishlistController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Middleware to authenticate user

const router = express.Router();

// Protected routes for logged-in users to manage their wishlist
router.get('/', authenticateToken, viewWishlist); // View the wishlist
router.post('/', authenticateToken, addItemToWishlist); // Add item to wishlist
router.delete('/:itemId', authenticateToken, removeItemFromWishlist); // Remove item from wishlist
router.post('/move-to-cart/:itemId', authenticateToken, moveItemToCart); // Move item from wishlist to cart

export default router;
