import express from 'express';
import authentification from '../middlewares/authentification.js';
import * as salaryController from '../controllers/salaryController.js';

const router = express.Router();

// Routes de salaire
router.post('/', authentification, salaryController.createSalaryConfig);
router.get('/', authentification, salaryController.getSalaryConfig);
router.patch('/', authentification, salaryController.updateSalaryConfig);

export default router;