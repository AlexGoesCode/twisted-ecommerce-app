// orderRoutes.js
import express from 'express';
import { placeOrder, getUserOrders } from '../controller/orderController.js';

const router = express.Router();

router.post('/place-order', placeOrder);
router.get('/user-orders/:userId', getUserOrders);

export default router;
