import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { BlogsQueryRepository } from '../blogs/blogs.query-repository';
import { CommentsInputDto } from '../comments/comments.dto';
import { CommentEntity } from '../comments/comments.entities';
import { CommentsQueryRepository } from '../comments/comments.query-repository';
import { CommentsQueryPaginationTerms } from '../comments/comments.types';
import { CommentsPaginationView } from '../comments/comments.view';
import { UsersService } from '../users/users.service';
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
            pageSize: pageSize ? +pageSize : 10,
            pageNumber: +pageNumber ? +pageNumber : 1,
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
        res.status(STATUS_CODES.CREATED).json(createdPost);
        return;
    }
    static async getPostById(req: Request<{ id: string }, PostEntity>, res: Response<PostEntity>): Promise<void> {
        const post = await PostsQueryRepository.findPostById(req.params.id);
        if (!post) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.status(STATUS_CODES.OK).json(post);
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

    static async getCommentsByPostId(
        req: Request<{ postId: string }, {}, {}, CommentsQueryPaginationTerms>,
        res: Response<CommentsPaginationView>,
    ): Promise<void> {
        const postId = req.params.postId;
        const { sortBy, sortDirection, pageSize, pageNumber } = req.query;
        const foundPost = await PostsQueryRepository.findPostById(postId);
        if (!foundPost) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        const comments = await CommentsQueryRepository.findAllComments({
            sortBy,
            sortDirection,
            pageSize: pageSize ? +pageSize : 10,
            pageNumber: +pageNumber ? +pageNumber : 1,
            postId,
        });
        res.status(STATUS_CODES.OK).json(comments);
        return;
    }
    static async postCommentByPostId(
        req: Request<{ postId: string }, CommentEntity, CommentsInputDto>,
        res: Response<CommentEntity>,
    ): Promise<void> {
        const postId = req.params.postId;
        const commentatorId = req.userId;
        const commentCandidate = req.body;
        const foundPost = await PostsQueryRepository.findPostById(postId);
        if (!foundPost) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        const foundCommentator = await UsersService.getById(commentatorId.toString());
        if (!foundCommentator) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        const comment = await PostsService.createCommentByPostId(
            {
                ...commentCandidate,
            },
            foundCommentator,
            postId,
        );
        if (!comment) {
            res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
            return;
        }
        res.status(STATUS_CODES.CREATED).json(comment);
        return;
    }
}
