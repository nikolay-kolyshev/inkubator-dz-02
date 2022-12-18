/* Users router */

import { Router } from 'express';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { authBasicGuard } from '../auth/auth-basic.guard';
import { UsersController } from './users.controller';
import { usersValidation } from './users.validation';

const usersRouter = Router();

usersRouter.get(
    '/',
    authBasicGuard,
    ...usersValidation.pagination,
    inputValidationMiddleware,
    UsersController.getUsers,
);
usersRouter.post(
    '/',
    authBasicGuard,
    ...usersValidation.inputBody,
    inputValidationMiddleware,
    UsersController.postUser,
);
usersRouter.delete('/:id', authBasicGuard, UsersController.deleteUserById);

export default usersRouter;
