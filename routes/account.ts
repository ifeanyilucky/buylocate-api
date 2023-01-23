import { Router } from 'express';
import {
  createAddress,
  editAddress,
  getAddress,
  removeAddress,
} from '../controllers/account';
import auth from '../middleware/auth';
const router = Router();

router.route('/address/new').post(auth, createAddress);
router.route('/address/all').get(auth, getAddress);
router.route('/address/delete/:id').delete(auth, removeAddress);
router.route('/address/edit/:id').patch(auth, editAddress);
export default router;
