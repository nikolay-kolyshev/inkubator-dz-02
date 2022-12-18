/* Маршрутизация PL-роутов */

import { Router } from 'express';
import authRouter from '../modules/auth/auth.router';
import blogsRouter from '../modules/blogs/blogs.router';
import postsRouter from '../modules/posts/posts.router';
import testingRouter from '../modules/testing/testing.router';
import usersRouter from '../modules/users/users.router';

export const rootRouter = Router();

rootRouter.use('/blogs', blogsRouter);
rootRouter.use('/posts', postsRouter);
rootRouter.use('/auth', authRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/testing', testingRouter);
