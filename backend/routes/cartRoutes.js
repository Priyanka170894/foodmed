import express from 'express';
import { addItemToCart, getCart, updateCartItem, removeCartItem, clearCart } from '../controllers/cartController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Middleware to authenticate user

const router = express.Router();

// Routes for cart operations
router.post('/', authenticateToken, addItemToCart); // Add an item to the cart
router.get('/', authenticateToken, getCart); // Get all cart items for a user
router.put('/:itemId', authenticateToken, updateCartItem); // Update cart item quantity
router.delete('/clear', authenticateToken, clearCart);
router.delete('/:itemId', authenticateToken, removeCartItem); // Remove an item from the cart


export default router;
