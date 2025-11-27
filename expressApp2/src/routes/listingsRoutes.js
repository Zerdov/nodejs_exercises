import express from 'express';
import { getListingsController, searchListingsController } from '../controllers/listingsController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getListingsController);
router.post('/search', authenticateToken, searchListingsController);

export default router;
