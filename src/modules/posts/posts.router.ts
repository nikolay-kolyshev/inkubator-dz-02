/* Posts route */

import { Router } from 'express';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { authGuard } from '../auth/auth.guard';
import { PostsController } from './posts.controller';
import { postsValidation } from './posts.validation';

const postsRouter = Router();

postsRouter.get('/', PostsController.getAllPosts);
postsRouter.post('/', authGuard, ...postsValidation.inputBody, inputValidationMiddleware, PostsController.postPost);
postsRouter.get('/:id', authGuard, PostsController.getPostById);
postsRouter.put(
    '/:id',
    authGuard,
    ...postsValidation.update,
    ...postsValidation.inputBody,
    inputValidationMiddleware,
    PostsController.putPostById,
);
postsRouter.delete('/:id', authGuard, PostsController.deletePostById);

export default postsRouter;
