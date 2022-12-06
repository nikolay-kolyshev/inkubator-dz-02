"use strict";
/* Blogs route */
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
var auth_guard_1 = require("../auth/auth.guard");
var blogs_controller_1 = require("./blogs.controller");
var blogs_validation_1 = require("./blogs.validation");
var blogsRouter = (0, express_1.Router)();
blogsRouter.get.apply(blogsRouter, __spreadArray(__spreadArray(['/'], blogs_validation_1.blogsValidation.pagination, false), [blogs_controller_1.BlogsController.getAllBlogs], false));
blogsRouter.post.apply(blogsRouter, __spreadArray(__spreadArray(['/', auth_guard_1.authGuard], blogs_validation_1.blogsValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware, blogs_controller_1.BlogsController.postBlog], false));
blogsRouter.get('/:id', blogs_controller_1.BlogsController.getBlogById);
blogsRouter.get.apply(blogsRouter, __spreadArray(__spreadArray(['/:blogId/posts'], blogs_validation_1.blogsValidation.pagination, false), [input_validation_middleware_1.inputValidationMiddleware,
    blogs_controller_1.BlogsController.getPostsByBlogId], false));
blogsRouter.post.apply(blogsRouter, __spreadArray(__spreadArray(['/:blogId/posts',
    auth_guard_1.authGuard], blogs_validation_1.blogsValidation.newPost, false), [input_validation_middleware_1.inputValidationMiddleware,
    blogs_controller_1.BlogsController.postPostByBlogId], false));
blogsRouter.put.apply(blogsRouter, __spreadArray(__spreadArray(__spreadArray(['/:id',
    auth_guard_1.authGuard], blogs_validation_1.blogsValidation.update, false), blogs_validation_1.blogsValidation.inputBody, false), [input_validation_middleware_1.inputValidationMiddleware,
    blogs_controller_1.BlogsController.putBlogById], false));
blogsRouter.delete('/:id', auth_guard_1.authGuard, blogs_controller_1.BlogsController.deleteBlogById);
exports.default = blogsRouter;
//# sourceMappingURL=blogs.router.js.map