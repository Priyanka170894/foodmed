// routes/diseaseRoutes.js
import express from 'express';
import { getDiseasesByOrgan, getDiseaseDetails,getAllDiseases  } from '../controllers/diseaseController.js';

const router = express.Router();

// Get diseases by organ ID
router.get('/organ/:organId', getDiseasesByOrgan);
router.get('/', getAllDiseases);
// router.get('/diseases/organ/:organId', getDiseasesByOrgan);

// Get disease details with groceries
router.get('/:diseaseId', getDiseaseDetails);

export default router;
