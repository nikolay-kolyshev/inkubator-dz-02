import { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constants';
import { commentsCollection } from '../../database/collections';
import { UserEntity } from '../users/users.entities';
import { CommentsInputDto } from './comments.dto';
import { CommentEntity } from './comments.entities';
import { CommentsQueryRepository } from './comments.query-repository';
import { CommentsService } from './comments.service';

export class CommentsController {
    static async getCommentById(req: Request<{ id: string }>, res: Response<CommentEntity>) {
        const id = req.params.id;
        const foundComment = await CommentsService.getById(id);
        if (!foundComment) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        res.json(foundComment);
        return;
    }

    static async putCommentById(req: Request<{ commentId: string }, CommentsInputDto>, res: Response<void>) {
        const id = req.params.commentId;
        const foundComment = await CommentsQueryRepository.findCommentEntityById(id);
        if (!foundComment) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        const isCommentUpdated = await CommentsService.updateById(id, req.body.dto);
        if (!isCommentUpdated) {
            res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }

    static async deleteCommentById(req: Request<{ commentId: string }>, res: Response<UserEntity>) {
        const id = req.params.commentId;
        const foundComment = await CommentsQueryRepository.findCommentEntityById(id);
        if (!foundComment) {
            res.sendStatus(STATUS_CODES.NOT_FOUND);
            return;
        }
        const isCommentDeleted = await CommentsService.deleteById(id);
        if (!isCommentDeleted) {
            res.sendStatus(STATUS_CODES.INTERNAL_SERVER_ERROR);
            return;
        }
        res.sendStatus(STATUS_CODES.NO_CONTENT);
        return;
    }

    static async deleteAllComments(): Promise<void> {
        await commentsCollection.deleteMany({});
    }
}
