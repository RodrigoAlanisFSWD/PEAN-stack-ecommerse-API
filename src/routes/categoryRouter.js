import { Router } from 'express';
import { createBreakPoint, getPdsBreakPoint, getAllBreakPoint } from '../controllers/categoryController';
import auth from '../middlewares/authMiddleware';
import admin from '../middlewares/adminMiddleware';
const router = Router();

router.post('/create', auth, admin, createBreakPoint);
router.get('/getAll', auth, getAllBreakPoint);
router.get('/getPds/:id', auth, getPdsBreakPoint);

module.exports = router