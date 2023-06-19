import { Router } from 'express';
import { authJwtGuard } from '../../common/guards/auth-jwt.guard';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { CommentsController } from './comments.controller';
import { commentsValidation } from './comments.validation';

const commentsRouter = Router();

commentsRouter.get('/:commentId', CommentsController.getCommentById);
commentsRouter.put(
    '/:commentId',
    authJwtGuard,
    ...commentsValidation.inputBody,
    inputValidationMiddleware,
    CommentsController.putCommentById,
);
commentsRouter.delete('/:id', authJwtGuard, CommentsController.deleteCommentById);

export default commentsRouter;
