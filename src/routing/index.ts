/* Маршрутизация PL-роутов */

import { Router } from 'express';
import blogsRouter from '../modules/blogs/blogs.router';
import postsRouter from '../modules/posts/posts.router';
import testingRouter from '../modules/testing/testing.router';

export const rootRouter = Router();

rootRouter.use('/blogs', blogsRouter);
rootRouter.use('/posts', postsRouter);
rootRouter.use('/testing', testingRouter);
