import express from 'express';
import authentification from '../middlewares/authentification.js';
import * as salaryController from '../controllers/salaryController.js';
import * as salaryAdjustementController from '../controllers/salaryAdjustmentController.js';

const router = express.Router();

// Routes de configuration du salaire de base
router.post('/config', authentification, salaryController.createSalaryConfig);
router.get('/config', authentification, salaryController.getSalaryConfig);
router.patch('/config', authentification, salaryController.updateSalaryConfig);

// Routes d'ajustement du salaire
router.post('/adjustment/new', authentification, salaryAdjustementController.createSalaryAdjustement);
router.get('/adjustments/all', authentification, salaryAdjustementController.getSalaryAdjustements);
router.patch('/adjustment/:id', authentification, salaryAdjustementController.updateSalaryAdjustement);
router.delete('/adjustment/:id', authentification, salaryAdjustementController.deleteSalaryAdjustement);

export default router;