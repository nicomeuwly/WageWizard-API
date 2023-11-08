import express from 'express';
import authentification from '../middlewares/authentification.js';
import * as authController from '../controllers/authController.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Routes d'authentification
router.post('/login', authController.login);
router.post('/logout', authentification, authController.logout);
router.post('/logout/all', authentification, authController.logoutAll);

// Routes d'utilisateur
router.post('/', userController.createUser);
router.get('/me', authentification, userController.getMe);
router.patch('/me', authentification, userController.updateUser);
router.delete('/me', authentification, userController.deleteUser);

export default router;