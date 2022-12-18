import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { BlogsRepository } from '../blogs/blogs.repository';
import { PostsRepository } from '../posts/posts.repository';
import { UsersController } from '../users/users.controller';

export class TestingController {
    static async deleteAllData(req: Request, res: Response): Promise<void> {
        await BlogsRepository.deleteAllBlogs();
        await PostsRepository.deleteAllPosts();
        await UsersController.deleteAllUsers();
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
}
