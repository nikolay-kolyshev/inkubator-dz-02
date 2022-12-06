import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { BlogsInputDTO } from './blogs.dto';
import { BlogEntity } from './blogs.entities';
import { BlogScheme } from './blogs.schemes';
import { BlogsService } from './blogs.service';

export class BlogsController {
    static async getAllBlogs(req: Request, res: Response<BlogEntity[]>): Promise<void> {
        const blogs = await BlogsService.findAllBlogs();
        res.status(STATUS_CODES.OK).json(blogs);
        return;
    }
    static async postBlog(req: Request<{}, BlogScheme, BlogsInputDTO>, res: Response<BlogEntity>): Promise<void> {
        const blogCandidate = req.body;
        const blog = await BlogsService.createBlog(blogCandidate);
        res.status(STATUS_CODES.CREATED).json(blog);
        return;
    }
    static async getBlogById(req: Request<{ id: string }, BlogScheme>, res: Response<BlogEntity>): Promise<void> {
        const blog = await BlogsService.findBlogById(req.params.id);
        if (!blog) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.status(STATUS_CODES.OK).json({
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
        });
        return;
    }
    static async putBlogById(req: Request<{ id: string }, void, BlogsInputDTO>, res: Response<void>): Promise<void> {
        const blogWithUpdate = req.body;
        const isBlogUpdated = await BlogsService.updateBlogById(req.params.id, blogWithUpdate);
        if (!isBlogUpdated) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
    static async deleteBlogById(req: Request<{ id: string }, void>, res: Response<void>): Promise<void> {
        const isBlogDeleted = await BlogsService.deleteBLogById(req.params.id);
        if (!isBlogDeleted) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
}
