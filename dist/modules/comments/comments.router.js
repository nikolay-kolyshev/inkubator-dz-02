"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_middleware_1 = require("../../common/middlewares/auth.middleware");
var comments_controller_1 = require("./comments.controller");
var commentsRouter = (0, express_1.Router)();
commentsRouter.get('/:commentId', auth_middleware_1.authMiddleware, comments_controller_1.CommentsController.getCommentById);
commentsRouter.put('/:commentId', auth_middleware_1.authMiddleware, comments_controller_1.CommentsController.putCommentById);
commentsRouter.delete('/:id', auth_middleware_1.authMiddleware, comments_controller_1.CommentsController.deleteCommentById);
exports.default = commentsRouter;
//# sourceMappingURL=comments.router.js.map