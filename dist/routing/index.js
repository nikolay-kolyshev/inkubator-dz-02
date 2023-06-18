"use strict";
/* Маршрутизация PL-роутов */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
var express_1 = require("express");
var auth_router_1 = __importDefault(require("../modules/auth/auth.router"));
var blogs_router_1 = __importDefault(require("../modules/blogs/blogs.router"));
var comments_router_1 = __importDefault(require("../modules/comments/comments.router"));
var posts_router_1 = __importDefault(require("../modules/posts/posts.router"));
var testing_router_1 = __importDefault(require("../modules/testing/testing.router"));
var users_router_1 = __importDefault(require("../modules/users/users.router"));
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.use('/blogs', blogs_router_1.default);
exports.rootRouter.use('/posts', posts_router_1.default);
exports.rootRouter.use('/auth', auth_router_1.default);
exports.rootRouter.use('/users', users_router_1.default);
exports.rootRouter.use('/comments', comments_router_1.default);
exports.rootRouter.use('/testing', testing_router_1.default);
//# sourceMappingURL=index.js.map