import { Router } from 'express';
import { signInBreakPoint, logInBreakPoint } from '../controllers/authController';
const router = Router();

router.post('/signIn', signInBreakPoint);
router.post('/logIn', logInBreakPoint);

module.exports = router