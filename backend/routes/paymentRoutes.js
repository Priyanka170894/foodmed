import express from 'express';
import { createPayPalOrder, capturePayPalPayment } from '../controllers/paymentController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create PayPal payment order
router.post('/create-paypal-order', authenticateToken, createPayPalOrder);

// Route to capture a PayPal payment
router.post('/capture-paypal-payment', authenticateToken, capturePayPalPayment);

export default router;
