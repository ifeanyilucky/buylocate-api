import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orders';
import auth from '../middleware/auth';

const router = Router();

router.route('/new').post(auth, createOrder);
router.route('/').get(auth, getOrders);

export default router;
