import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { PostsInputDTO } from './posts.dto';
import { PostEntity } from './posts.entities';
import { PostsService } from './posts.service';

export class PostsController {
    static async getAllPosts(req: Request, res: Response<PostEntity[]>): Promise<void> {
        const posts = await PostsService.findAllPosts();
        res.status(STATUS_CODES.OK).json(posts);
        return;
    }
    static async postPost(req: Request<{}, PostEntity, PostsInputDTO>, res: Response<PostEntity>): Promise<void> {
        const postCandidate = req.body;
        const post = await PostsService.createPost(postCandidate);
        res.status(STATUS_CODES.CREATED).json(post);
        return;
    }
    static async getPostById(req: Request<{ id: string }, PostEntity>, res: Response<PostEntity>): Promise<void> {
        const post = await PostsService.findPostById(req.params.id);
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
            blogName: post.blogName,
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
