import express from 'express';
import { showLoginPage, handleLogin, logout } from '../controllers/loginController.js';

const router = express.Router();

router.get('/', showLoginPage);
router.post('/', handleLogin);
router.get('/logout', logout);

export default router;
