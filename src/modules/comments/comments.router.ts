import { Router } from 'express';
import { authJwtGuard } from '../../common/guards/auth-jwt.guard';
import { CommentsController } from './comments.controller';

const commentsRouter = Router();

commentsRouter.get('/:commentId', CommentsController.getCommentById);
commentsRouter.put('/:commentId', authJwtGuard, CommentsController.putCommentById);
commentsRouter.delete('/:id', authJwtGuard, CommentsController.deleteCommentById);

export default commentsRouter;
