/** Auth router */
import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const authRouter = Router();

authRouter.post('/login', ...authValidation.loginBody, AuthController.postLogin);

export default authRouter;
