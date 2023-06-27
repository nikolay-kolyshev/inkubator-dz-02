/** Auth router */
import { Router } from 'express';
import { authAccessTokenJwtGuard } from '../../common/guards/auth-access-token-jwt.guard';
import { authRefreshTokenJwtGuard } from '../../common/guards/auth-refresh-token-jwt.guard';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const authRouter = Router();

authRouter.post('/login', ...authValidation.loginBody, inputValidationMiddleware, AuthController.login);
authRouter.get('/me', authAccessTokenJwtGuard, AuthController.getMe);
authRouter.post(
    '/registration',
    ...authValidation.registrationBody,
    inputValidationMiddleware,
    AuthController.registration,
);
authRouter.post(
    '/registration-confirmation',
    ...authValidation.registrationConfirmationBody,
    inputValidationMiddleware,
    AuthController.registrationConfirmation,
);
authRouter.post(
    '/registration-email-resending',
    ...authValidation.registrationEmailResendingBody,
    inputValidationMiddleware,
    AuthController.registrationEmailResending,
);
authRouter.post('/refresh-token', authRefreshTokenJwtGuard, AuthController.refreshToken);
authRouter.post('/logout', authRefreshTokenJwtGuard, AuthController.logout);

export default authRouter;
