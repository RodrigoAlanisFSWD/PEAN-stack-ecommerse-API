import { Router } from 'express';
import { createBreakPoint, getAllBreakPoint, getOneBreakPoint, deleteBreakPoint } from '../controllers/productController';
import auth from '../middlewares/authMiddleware';
import admin from '../middlewares/adminMiddleware';
const router = Router();

router.post('/create', auth, admin, createBreakPoint);
router.get('/getAll', auth, getAllBreakPoint);
router.get('/get/:id', auth, getOneBreakPoint);
router.delete('/delete/:id', auth, admin, deleteBreakPoint);

module.exports = router