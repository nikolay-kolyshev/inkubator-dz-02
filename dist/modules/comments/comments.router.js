"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_jwt_guard_1 = require("../../common/guards/auth-jwt.guard");
var input_validation_middleware_1 = require("../../common/middlewares/input-validation.middleware");
var comments_controller_1 = require("./comments.controller");
var comments_validation_1 = require("./comments.validation");
var commentsRouter = (0, express_1.Router)();
commentsRouter.get('/:commentId', comments_controller_1.CommentsController.getCommentById);
commentsRouter.put.apply(commentsRouter, __spreadArray(__spreadArray(['/:commentId',
    auth_jwt_guard_1.authJwtGuard], comments_validation_1.commentsValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    comments_controller_1.CommentsController.putCommentById], false));
commentsRouter.delete('/:id', auth_jwt_guard_1.authJwtGuard, comments_controller_1.CommentsController.deleteCommentById);
exports.default = commentsRouter;
//# sourceMappingURL=comments.router.js.map