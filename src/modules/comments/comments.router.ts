import { Router } from 'express';
import { authMiddleware } from '../../common/middlewares/auth.middleware';
import { CommentsController } from './comments.controller';

const commentsRouter = Router();

commentsRouter.get('/:commentId', authMiddleware, CommentsController.getCommentById);
commentsRouter.put('/:commentId', authMiddleware, CommentsController.putCommentById);
commentsRouter.delete('/:id', authMiddleware, CommentsController.deleteCommentById);

export default commentsRouter;
