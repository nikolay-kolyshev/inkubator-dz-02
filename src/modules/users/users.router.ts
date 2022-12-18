/* Users router */

import { Router } from 'express';
import { authBasicGuard } from '../auth/auth-basic.guard';
import { UsersController } from './users.controller';
import { usersValidation } from './users.validation';

const usersRouter = Router();

usersRouter.get('/', authBasicGuard, ...usersValidation.pagination, UsersController.getUsers);
usersRouter.post('/', authBasicGuard, ...usersValidation.inputBody, UsersController.postUser);
usersRouter.delete('/:id', authBasicGuard, UsersController.deleteUserById);

export default usersRouter;
