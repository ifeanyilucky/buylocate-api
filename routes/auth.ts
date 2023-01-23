import { Router } from 'express';
import { login, register, getAccount } from '../controllers/auth';
import auth from '../middleware/auth';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/account/:id').get(auth, getAccount);

export default router;
