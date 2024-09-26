import express from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } from '../controllers/authController.js'; // Import the logout controller
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Middleware to check if the user is authenticated


const router = express.Router();

// Route for registering a user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', loginUser);

// Route for logging out the user (using authenticateToken to ensure only logged-in users can log out)
router.post('/logout', authenticateToken, logoutUser);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
