/* Posts route */

import { Router } from 'express';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { authBasicGuard } from '../auth/auth-basic.guard';
import { PostsController } from './posts.controller';
import { postsValidation } from './posts.validation';

const postsRouter = Router();

postsRouter.get('/', PostsController.getAllPosts);
postsRouter.post(
    '/',
    authBasicGuard,
    ...postsValidation.inputBody,
    inputValidationMiddleware,
    PostsController.postPost,
);
postsRouter.get('/:id', PostsController.getPostById);
postsRouter.put(
    '/:id',
    authBasicGuard,
    ...postsValidation.update,
    ...postsValidation.inputBody,
    inputValidationMiddleware,
    PostsController.putPostById,
);
postsRouter.delete('/:id', authBasicGuard, PostsController.deletePostById);

export default postsRouter;
