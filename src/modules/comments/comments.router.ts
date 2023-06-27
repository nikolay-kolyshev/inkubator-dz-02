import { Router } from 'express';
import { authAccessTokenJwtGuard } from '../../common/guards/auth-access-token-jwt.guard';
import { inputValidationMiddleware } from '../../common/middlewares/input-validation.middleware';
import { CommentsController } from './comments.controller';
import { commentsValidation } from './comments.validation';

const commentsRouter = Router();

commentsRouter.get('/:commentId', CommentsController.getCommentById);
commentsRouter.put(
    '/:commentId',
    authAccessTokenJwtGuard,
    ...commentsValidation.inputBody,
    inputValidationMiddleware,
    CommentsController.putCommentById,
);
commentsRouter.delete('/:id', authAccessTokenJwtGuard, CommentsController.deleteCommentById);

export default commentsRouter;
