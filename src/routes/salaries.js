import express from 'express';
import authentification from '../middlewares/authentification.js';
import * as salaryController from '../controllers/salaryController.js';

const router = express.Router();

// Routes de salaire
router.post('/', authentification, salaryController.createOrUpdateSalaryConfig);

export default router;