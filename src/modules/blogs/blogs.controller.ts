import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { PostsInputDTO } from '../posts/posts.dto';
import { PostEntity } from '../posts/posts.entities';
import { PostsQueryRepository } from '../posts/posts.query-repository';
import { PostScheme } from '../posts/posts.schemes';
import { PostPaginationView } from '../posts/posts.view';
import { BlogsInputDTO } from './blogs.dto';
import { BlogEntity } from './blogs.entities';
import { BlogsQueryRepository } from './blogs.query-repository';
import { BlogScheme } from './blogs.schemes';
import { BlogsService } from './blogs.service';
import { BlogsQueryPaginationTerms, PostsQueryByBlogIdPaginationTerms } from './blogs.types';
import { BlogPaginationView } from './blogs.view';

export class BlogsController {
    static async getAllBlogs(
        req: Request<{}, {}, {}, BlogsQueryPaginationTerms>,
        res: Response<BlogPaginationView>,
    ): Promise<void> {
        const { searchNameTerm, sortBy, sortDirection, pageSize, pageNumber } = req.query;
        const blogs = await BlogsQueryRepository.findAllBlogs({
            searchNameTerm,
            sortBy,
            sortDirection,
            pageSize,
            pageNumber,
        });
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
        const blog = await BlogsQueryRepository.findBlogById(req.params.id);
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
    static async getPostsByBlogId(
        req: Request<{ blogId: string }, {}, {}, PostsQueryByBlogIdPaginationTerms>,
        res: Response<PostPaginationView>,
    ): Promise<void> {
        const blogId = req.params.blogId;
        const { sortBy, sortDirection, pageSize, pageNumber } = req.query;
        const foundBlog = await BlogsQueryRepository.findBlogById(blogId);
        if (!foundBlog) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
        }
        const posts = await PostsQueryRepository.findAllPosts({
            sortBy,
            sortDirection,
            pageSize,
            pageNumber,
            blogId,
        });
        res.status(STATUS_CODES.OK).json(posts);
        return;
    }
    static async postPostByBlogId(
        req: Request<{ blogId: string }, PostScheme, PostsInputDTO>,
        res: Response<PostEntity>,
    ): Promise<void> {
        const blogId = req.params.blogId;
        const postCandidate = req.body;
        const foundBlog = await BlogsQueryRepository.findBlogById(blogId);
        if (!foundBlog) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
        }
        const post = await BlogsService.createPostByBlogId(blogId, postCandidate);
        res.status(STATUS_CODES.CREATED).json(post);
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
