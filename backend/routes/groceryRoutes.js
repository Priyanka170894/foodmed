// routes/groceryRoutes.js
import express from 'express';
import { getAllGroceries } from '../controllers/groceryController.js';

const router = express.Router();

// Get all groceries
router.get('/', getAllGroceries);

export default router;
