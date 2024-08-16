// orderRoutes.js
import express from 'express';
import { placeOrder, getUserOrders } from '../controller/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/place-order', authMiddleware, placeOrder);
router.get('/user-orders/:userId', getUserOrders);

export default router;
