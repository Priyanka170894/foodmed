// routes/userRoutes.js
import express from 'express';
import { getUserProfile, updateUserProfile, createUser, deleteUser, addUserAddress, deleteUserAddress, updateUserAddress } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create User (Registration by admin)
router.post('/', authenticateToken, createUser);

// Get User Profile
router.get('/profile', authenticateToken, getUserProfile);

// Update User Profile
router.put('/profile', authenticateToken, updateUserProfile);

// Delete User
router.delete('/:id', authenticateToken, deleteUser);

// Add New Address
router.post('/address', authenticateToken, addUserAddress);
//update the address
router.patch('/address/:addressId', authenticateToken, updateUserAddress);

// Delete Address
router.delete('/address/:addressId', authenticateToken, deleteUserAddress);

export default router;
