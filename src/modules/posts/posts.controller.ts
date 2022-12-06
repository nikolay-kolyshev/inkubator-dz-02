import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { BlogsQueryRepository } from '../blogs/blogs.query-repository';
import { PostsInputDTO } from './posts.dto';
import { PostEntity } from './posts.entities';
import { PostsQueryRepository } from './posts.query-repository';
import { PostsService } from './posts.service';
import { PostsQueryPaginationTerms } from './posts.types';
import { PostPaginationView } from './posts.view';

export class PostsController {
    static async getAllPosts(
        req: Request<{}, {}, {}, PostsQueryPaginationTerms>,
        res: Response<PostPaginationView>,
    ): Promise<void> {
        const { sortBy, sortDirection, pageSize, pageNumber } = req.query;
        const posts = await PostsQueryRepository.findAllPosts({
            sortBy,
            sortDirection,
            pageSize,
            pageNumber,
        });
        res.status(STATUS_CODES.OK).json(posts);
        return;
    }
    static async postPost(req: Request<{}, PostEntity, PostsInputDTO>, res: Response<PostEntity>): Promise<void> {
        const postCandidate = req.body;
        const blog = await BlogsQueryRepository.findBlogById(req.body.blogId);
        if (!blog) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        const createdPost = await PostsService.createPost({
            ...postCandidate,
            blogName: blog.name,
        });
        const postView = await PostsQueryRepository.findPostById(createdPost.id);
        if (!postView) {
            res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
            return;
        }
        res.status(STATUS_CODES.CREATED).json(postView);
        return;
    }
    static async getPostById(req: Request<{ id: string }, PostEntity>, res: Response<PostEntity>): Promise<void> {
        const post = await PostsQueryRepository.findPostById(req.params.id);
        if (!post) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.status(STATUS_CODES.OK).json({
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            createdAt: post.createdAt,
        });
        return;
    }
    static async putPostById(req: Request<{ id: string }, void, PostsInputDTO>, res: Response<void>): Promise<void> {
        const postWithUpdate = req.body;
        const postUpdateResult = await PostsService.updatePostById(req.params.id, postWithUpdate);
        if (postUpdateResult.error) {
            res.sendStatus(postUpdateResult.error.code);
            res.statusMessage = postUpdateResult.error.message;
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
    static async deletePostById(req: Request<{ id: string }, void>, res: Response<void>): Promise<void> {
        const isPostDeleted = await PostsService.deleteBLogById(req.params.id);
        if (!isPostDeleted) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }
}
