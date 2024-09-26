import express from 'express';
import { getOrderHistory, updateOrderStatus, createOrder, getOrderById,  getOrderedGroceries,postReview,
    getReviewsForOrder,
    updateReview,
    deleteReview } from '../controllers/orderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Middleware to authenticate user

const router = express.Router();

// Protected routes for logged-in users to manage their orders
router.get('/', authenticateToken, getOrderHistory); // Get order history
router.put('/:orderId', authenticateToken, updateOrderStatus); // Update order status
router.post('/', authenticateToken, createOrder); // Place a new order
router.get('/:orderId', authenticateToken, getOrderById); // Get specific order by ID
router.get('/ordered-groceries', authenticateToken, getOrderedGroceries);
// Route to post a review for an item in an order
router.post('/:orderId/review/:groceryId', authenticateToken, postReview);

// Route to get all reviews for a specific order
router.get('/:orderId/reviews', authenticateToken, getReviewsForOrder);

// Route to update a review for an item in an order
router.put('/:orderId/review/:groceryId', authenticateToken, updateReview);

// Route to delete a review for an item in an order
router.delete('/:orderId/review/:groceryId', authenticateToken, deleteReview);

export default router;
