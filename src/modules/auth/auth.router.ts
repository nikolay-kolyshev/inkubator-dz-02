/** Auth router */
import { Router } from 'express';
import { authJwtGuard } from '../../common/guards/auth-jwt.guard';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const authRouter = Router();

authRouter.post('/login', ...authValidation.loginBody, inputValidationMiddleware, AuthController.postLogin);
authRouter.get('/me', authJwtGuard, AuthController.getMe);

export default authRouter;
