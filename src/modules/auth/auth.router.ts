/** Auth router */
import { Router } from 'express';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const authRouter = Router();

authRouter.post('/login', ...authValidation.loginBody, inputValidationMiddleware, AuthController.postLogin);
authRouter.get('/me', authMiddleware, AuthController.getMe);

export default authRouter;
