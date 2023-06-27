/* Posts route */

import { Router } from 'express';
import { authBasicGuard } from '../../common/guards/auth-basic.guard';
import { authAccessTokenJwtGuard } from '../../common/guards/auth-access-token-jwt.guard';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { blogsValidation } from '../blogs/blogs.validation';
import { PostsController } from './posts.controller';
import { postsValidation } from './posts.validation';
import {commentsValidation} from "../comments/comments.validation";

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
postsRouter.get(
    '/:postId/comments',
    ...blogsValidation.pagination,
    inputValidationMiddleware,
    PostsController.getCommentsByPostId,
);
postsRouter.post(
    '/:postId/comments',
    authAccessTokenJwtGuard,
    ...commentsValidation.inputBody,
    inputValidationMiddleware,
    PostsController.postCommentByPostId,
);
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
