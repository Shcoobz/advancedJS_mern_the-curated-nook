import express from 'express';
import loginLimiter from '../middleware/loginLimiter.js';
import { login, refresh, logout } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.route('/').post(loginLimiter, login);

authRouter.route('/refresh').get(refresh);

authRouter.route('/logout').post(logout);

export default authRouter;
