/* Blogs route */

import { Router } from 'express';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { authBasicGuard } from '../auth/auth-basic.guard';
import { BlogsController } from './blogs.controller';
import { blogsValidation } from './blogs.validation';

const blogsRouter = Router();

blogsRouter.get('/', ...blogsValidation.pagination, BlogsController.getAllBlogs);
blogsRouter.post(
    '/',
    authBasicGuard,
    ...blogsValidation.inputBody,
    inputValidationMiddleware,
    BlogsController.postBlog,
);
blogsRouter.get('/:id', BlogsController.getBlogById);
blogsRouter.get(
    '/:blogId/posts',
    ...blogsValidation.pagination,
    inputValidationMiddleware,
    BlogsController.getPostsByBlogId,
);
blogsRouter.post(
    '/:blogId/posts',
    authBasicGuard,
    ...blogsValidation.newPost,
    inputValidationMiddleware,
    BlogsController.postPostByBlogId,
);
blogsRouter.put(
    '/:id',
    authBasicGuard,
    ...blogsValidation.update,
    ...blogsValidation.inputBody,
    inputValidationMiddleware,
    BlogsController.putBlogById,
);
blogsRouter.delete('/:id', authBasicGuard, BlogsController.deleteBlogById);

export default blogsRouter;
