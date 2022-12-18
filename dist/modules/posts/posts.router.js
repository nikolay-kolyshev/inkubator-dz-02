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
var input_validation_middleware_1 = require("../../common/middlewares/input-validation.middleware");
var auth_basic_guard_1 = require("../auth/auth-basic.guard");
var posts_controller_1 = require("./posts.controller");
var posts_validation_1 = require("./posts.validation");
var postsRouter = (0, express_1.Router)();
postsRouter.get('/', posts_controller_1.PostsController.getAllPosts);
postsRouter.post.apply(postsRouter, __spreadArray(__spreadArray(['/',
    auth_basic_guard_1.authBasicGuard], posts_validation_1.postsValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    posts_controller_1.PostsController.postPost], false));
postsRouter.get('/:id', posts_controller_1.PostsController.getPostById);
postsRouter.put.apply(postsRouter, __spreadArray(__spreadArray(__spreadArray(['/:id',
    auth_basic_guard_1.authBasicGuard], posts_validation_1.postsValidation.update, false), posts_validation_1.postsValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    posts_controller_1.PostsController.putPostById], false));
postsRouter.delete('/:id', auth_basic_guard_1.authBasicGuard, posts_controller_1.PostsController.deletePostById);
exports.default = postsRouter;
//# sourceMappingURL=posts.router.js.map