"use strict";
/* Posts route */
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
var auth_basic_guard_1 = require("../../common/guards/auth-basic.guard");
var auth_jwt_guard_1 = require("../../common/guards/auth-jwt.guard");
var input_validation_middleware_1 = require("../../common/middlewares/input-validation.middleware");
var blogs_validation_1 = require("../blogs/blogs.validation");
var posts_controller_1 = require("./posts.controller");
var posts_validation_1 = require("./posts.validation");
var postsRouter = (0, express_1.Router)();
postsRouter.get('/', posts_controller_1.PostsController.getAllPosts);
postsRouter.post.apply(postsRouter, __spreadArray(__spreadArray(['/',
    auth_basic_guard_1.authBasicGuard], posts_validation_1.postsValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    posts_controller_1.PostsController.postPost], false));
postsRouter.get('/:id', posts_controller_1.PostsController.getPostById);
postsRouter.get.apply(postsRouter, __spreadArray(__spreadArray(['/:postId/comments'], blogs_validation_1.blogsValidation.pagination, false), [input_validation_middleware_1.inputValidationMiddleware,
    posts_controller_1.PostsController.getCommentsByPostId], false));
postsRouter.post.apply(postsRouter, __spreadArray(__spreadArray(['/:postId/comments',
    auth_jwt_guard_1.authJwtGuard], blogs_validation_1.blogsValidation.newComment, false), [input_validation_middleware_1.inputValidationMiddleware,
    posts_controller_1.PostsController.postCommentByPostId], false));
postsRouter.put.apply(postsRouter, __spreadArray(__spreadArray(__spreadArray(['/:id',
    auth_basic_guard_1.authBasicGuard], posts_validation_1.postsValidation.update, false), posts_validation_1.postsValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    posts_controller_1.PostsController.putPostById], false));
postsRouter.delete('/:id', auth_basic_guard_1.authBasicGuard, posts_controller_1.PostsController.deletePostById);
exports.default = postsRouter;
//# sourceMappingURL=posts.router.js.map