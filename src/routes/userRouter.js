import { Router } from 'express';
import { profileBreakPoint } from '../controllers/userController';
import auth from '../middlewares/authMiddleware';
const router = Router();

router.get('/profile',auth,profileBreakPoint)

module.exports = router