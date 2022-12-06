/* Blogs route */

import { Router } from 'express';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { authGuard } from '../auth/auth.guard';
import { BlogsController } from './blogs.controller';
import { blogsValidation } from './blogs.validation';

const blogsRouter = Router();

blogsRouter.get('/', ...blogsValidation.pagination, BlogsController.getAllBlogs);
blogsRouter.post('/', authGuard, ...blogsValidation.inputBody, inputValidationMiddleware, BlogsController.postBlog);
blogsRouter.get('/:id', BlogsController.getBlogById);
blogsRouter.get(
    '/:blogId/posts',
    ...blogsValidation.pagination,
    inputValidationMiddleware,
    BlogsController.getPostsByBlogId,
);
blogsRouter.post(
    '/:blogId/posts',
    authGuard,
    ...blogsValidation.newPost,
    inputValidationMiddleware,
    BlogsController.postPostByBlogId,
);
blogsRouter.put(
    '/:id',
    authGuard,
    ...blogsValidation.update,
    ...blogsValidation.inputBody,
    inputValidationMiddleware,
    BlogsController.putBlogById,
);
blogsRouter.delete('/:id', authGuard, BlogsController.deleteBlogById);

export default blogsRouter;
