import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { BlogsInputDTO } from './blogs.dto';
import { BlogsRepository } from './blogs.repository';
import { BlogScheme } from './blogs.schemes';

export class BlogsController {
    static async getAllBlogs(req: Request, res: Response<BlogScheme[]>): Promise<void> {
        const blogs = await BlogsRepository.findAllBlogs();
        res.status(STATUS_CODES.OK).json(blogs);
        return;
    }
    static async postBlog(req: Request<{}, BlogScheme, BlogsInputDTO>, res: Response<BlogScheme>): Promise<void> {
        const blogCandidate = req.body;
        const blog = await BlogsRepository.createBlog(blogCandidate);
        res.status(STATUS_CODES.CREATED).json(blog);
        return;
    }
    static async getBlogById(req: Request<{ id: string }, BlogScheme>, res: Response<BlogScheme>): Promise<void> {
        const blog = await BlogsRepository.findBlogById(req.params.id);
        if (!blog) {
            res.status(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.status(STATUS_CODES.OK).json(blog);
        return;
    }
    static async putBlogById(req: Request<{ id: string }, void, BlogsInputDTO>, res: Response<void>): Promise<void> {
        const blogWithUpdate = req.body;
        const isBlogUpdated = await BlogsRepository.updateBlogById(req.params.id, blogWithUpdate);
        if (!isBlogUpdated) {
            res.status(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.status(STATUS_CODES.NO_CONTENT);
        return;
    }
    static async deleteBlogById(req: Request<{ id: string }, void>, res: Response<void>): Promise<void> {
        const isBlogDeleted = await BlogsRepository.deleteBLogById(req.params.id);
        if (!isBlogDeleted) {
            res.status(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.status(STATUS_CODES.NO_CONTENT);
        return;
    }
}
