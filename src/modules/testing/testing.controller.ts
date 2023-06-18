import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { BlogsRepository } from '../blogs/blogs.repository';
import { PostsRepository } from '../posts/posts.repository';
import { UsersController } from '../users/users.controller';
import {CommentsController} from "../comments/comments.controller";

export class TestingController {
    static async deleteAllData(req: Request, res: Response): Promise<void> {
        await BlogsRepository.deleteAllBlogs();
        await PostsRepository.deleteAllPosts();
        await UsersController.deleteAllUsers();
        await CommentsController.deleteAllComments();
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
}
