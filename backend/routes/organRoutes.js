// routes/organRoutes.js
import express from 'express';
import { getAllOrgans, getOrgansFilter } from '../controllers/organController.js';

const router = express.Router();

// Get all organs
router.get('/', getAllOrgans);
router.get('/filter', getOrgansFilter)

export default router;
